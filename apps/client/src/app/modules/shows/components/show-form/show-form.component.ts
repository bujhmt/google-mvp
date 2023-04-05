import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'show-form',
    templateUrl: './show-form.component.html',
})
export class ShowFormComponent {
    public showForm = this.getShowForm();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dynamicDialogRef: DynamicDialogRef,
    ) {
    }

    public submit() {
        if (this.showForm.invalid) {
            return;
        }

        const show = this.showForm.value;
        this.dynamicDialogRef.close(show);
    }

    public reset() {
        this.showForm = this.getShowForm();
    }


    private getShowForm() {
        return this.formBuilder.nonNullable.group({
            name: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(64)
            ]],
            actors: [[], [
                Validators.required,
                Validators.minLength(1)
            ]],
            date: [new Date(), [
                Validators.required,
            ]],
            cost: [0, [
                Validators.min(0),
            ]],
            description: ['', [
                Validators.minLength(1)
            ]],
            annotation: ['', [
                Validators.minLength(1)
            ]],
            critics: ['', [
                Validators.minLength(1)
            ]],
        })
    }
}
