import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class MustMatch {

    public static mustMatch(
        initialFieldName: string,
        confirmFieldName: string,
        validatorFn: ValidationErrors): ValidatorFn {
            return (form: AbstractControl): ValidationErrors | null => {
                const initialControl: AbstractControl = form.get(initialFieldName);
                const confirmControl: AbstractControl = form.get(confirmFieldName);
                
                const initialValue = initialControl?.value;
                const confirmValue = confirmControl?.value;

                if ((initialControl.errors !== null || confirmControl.errors !== null)) {
                    return; // Already on error
                }
                if (initialValue !== null && confirmValue !== null) {
                    if (initialValue !== confirmValue) {
                        return validatorFn;
                    }
                }
                return null;
            }
        } 
}
