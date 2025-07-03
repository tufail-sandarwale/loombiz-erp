import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedMaterialModules } from 'app/modules/shared/modules/shared-material-modules';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { defaultNavigation } from 'app/mock-api/common/navigation/data';

export interface Breadcrumb {
  label: string;
  url: string;
}
  function flattenNavigation(items: FuseNavigationItem[], parentUrl: string = ''): Breadcrumb[] {
  const result: Breadcrumb[] = [];

  for (const item of items) {
    if (item.link) {
      result.push({
        label: item.title,
        url: item.link
      });
    }

    if (item.children) {
      result.push(...flattenNavigation(item.children, item.link || parentUrl));
    }
  }

  return result;
}
@Component({
  selector: 'app-breadcrumb',
  standalone: true,
   imports: [CommonModule, SharedMaterialModules], 
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})


export class BreadcrumbComponent implements OnInit {
 
public breadcrumbs: Breadcrumb[] = [];
public isHomePage = false;
  flatNav: Breadcrumb[];

  constructor(private router: Router, private route: ActivatedRoute) {}


ngOnInit(): void {
  this.updateBreadcrumbs(this.router.url); // initial

  this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.updateBreadcrumbs(this.router.url);
    });
}

private updateBreadcrumbs(path: string): void {
  this.isHomePage = path === '/home';
  const routeBreadcrumbs = this.buildBreadcrumb(path);
  this.breadcrumbs = [{ label: 'Home', url: '/home' }, ...routeBreadcrumbs];
}


  buildBreadcrumb(path: string): Breadcrumb[] {
  // Remove matrix parameters from each segment
  const segments = path
    .split('/')
    .filter(Boolean)
    .map(seg => seg.split(';')[0]); // 🔥 Remove matrix params

  const breadcrumbs: Breadcrumb[] = [];
  let accumulatedPath = '';

  for (const segment of segments) {
    accumulatedPath += '/' + segment;
    const label = this.findLabelByPath(accumulatedPath);
    if (label) {
      breadcrumbs.push({ label, url: accumulatedPath });
    }
  }

  return breadcrumbs;
}


  findLabelByPath(path: string, navItems = defaultNavigation): string | null {
    for (const item of navItems) {
      if (item.link === path) return item.title;
      if (item.children) {
        const found = this.findLabelByPath(path, item.children);
        if (found) return found;
      }
    }
    return null;
  }
  goTo(breadcrumb: Breadcrumb): void {
  const [path, ...matrix] = breadcrumb.url.split(';');
console.log(path);
  const matrixParams = matrix.reduce((acc, param) => {
    const [key, value] = param.split('=');
    acc[key] = decodeURIComponent(value || '');
    return acc;
  }, {} as Record<string, string>);

  this.router.navigate([path], { queryParams: matrixParams }); // or use `queryParamsHandling`
}


getMatrixParams(segment: string): Record<string, string> {
  const parts = segment.split(';');
  const paramParts = parts.slice(1);
  const params: Record<string, string> = {};

  for (const part of paramParts) {
    const [key, value] = part.split('=');
    params[key] = decodeURIComponent(value || '');
  }

  return params;
}

 


}
