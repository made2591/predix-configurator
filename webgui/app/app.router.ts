import { UIRouter }  from "ui-router-ng2";


/** UIRouter Config  */
export function UIRouterConfigFn(router: UIRouter) {
    // If no URL matches, go to the `igs` state's name by default
    router.urlService.rules.otherwise({ state: 'igsConfig' });
}
