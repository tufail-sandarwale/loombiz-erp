import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { BranchService } from 'app/core/services/branch.service';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
    standalone: true,
    imports: [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _userService: UserService,
        private brnachService: BranchService,
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signInForm = this._formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
            rememberMe: [''],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.login(this.signInForm.value).subscribe({
            next: (response) => {
                this._authService.accessToken = response.token;
                this._authService._authenticated = true;
                this._authService.session().subscribe({
                    next: result => {
                        this._userService.user = result;
                        this.brnachService.getBranch(result.branchIds[0]).subscribe({
                            next: branch => {
                                this._userService.userBranch = branch;
                            }
                        });
                        const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';
                        this._router.navigateByUrl(redirectURL);
                    }, error: (error) => {
                        this.signInForm.enable();
                        this.signInNgForm.resetForm();
                        this.alert = {
                            type: 'error',
                            message: 'Wrong email or password',
                        };
                        this.showAlert = true;
                    }
                })

            }, error: (error) => {
                this.signInForm.enable();
                this.signInNgForm.resetForm();
                this.alert = {
                    type: 'error',
                    message: error,
                };
                this.showAlert = true;
            }
        });
    }
}
