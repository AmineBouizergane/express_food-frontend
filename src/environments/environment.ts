// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host:"http://localhost:8080",
  headers: {
    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaG1lZF9tb3VuaXIiLCJyb2xlcyI6WyJERUxJVkVSWSIsIlVTRVIiXSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDkwL2xvZ2luIiwiZXhwIjoxNzE2NjU2MTkwfQ.-OUEKTdZwu_lJSANSJ1g2ysoCiqYluKAdLslULK271Q`
  },
  statusBadgeMap: {
    '1': 'text-bg-warning',
    '2': 'text-bg-primary',
    '3': 'text-bg-info',
    '4': 'text-bg-secondary',
    '5': 'text-bg-success',
    '6': 'text-bg-success',
    '7': 'text-bg-danger',
    '8': 'text-bg-danger',
    '9': 'text-bg-danger'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
