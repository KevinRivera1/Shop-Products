import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  breadcrumbs: Array<{ label: string, url: string }> = [];

constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

ngOnInit(): void {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.updateBreadcrumbs(this.activatedRoute.root);
    }
  });
}

updateBreadcrumbs(route: ActivatedRoute): void {
  this.breadcrumbs = [];
  let currentRoute = route;
  while (currentRoute) {
    const url = currentRoute.snapshot.url.map(segment => segment.path).join('/');
    if (url) {
      const breadcrumbLabel = currentRoute.snapshot.data['breadcrumb'] || this.getDefaultBreadcrumb(currentRoute);
      console.log(`Breadcrumb Label: ${breadcrumbLabel}, URL: ${url}`);
      this.breadcrumbs.unshift({ label: breadcrumbLabel, url: url });
    }
    currentRoute = currentRoute.firstChild as ActivatedRoute;
  }
}

getDefaultBreadcrumb(route: ActivatedRoute): string {
  const routeConfig = route.routeConfig;
  if (routeConfig && routeConfig.data && routeConfig.data['breadcrumb']) {
    console.log(`Default Breadcrumb: ${routeConfig.data['breadcrumb']}`);
    return routeConfig.data['breadcrumb'];
  }
  console.log('Default Breadcrumb: Untitled');
  return '';
}

}
