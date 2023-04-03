import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'sculpture-form',
    templateUrl: './sculpture-form.component.html',
})
export class SculptureFormComponent {
    public sculptureForm = this.getSculptureForm();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dynamicDialogRef: DynamicDialogRef,
    ) {
    }

    public submit() {
        if (this.sculptureForm.invalid) {
            return;
        }

        const sculpture = this.sculptureForm.value;
        this.dynamicDialogRef.close(sculpture);
    }

    public reset() {
        this.sculptureForm = this.getSculptureForm();
    }


    private getSculptureForm() {
        return this.formBuilder.nonNullable.group({
            title: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(64)
            ]],
            age: [1, [
                Validators.required,
                Validators.min(1),
            ]],
            authors: [[], [
                Validators.required,
                Validators.minLength(1)
            ]],
            cost: [0, [
                Validators.min(0),
            ]],
            description: ['', [
                Validators.minLength(1)
            ]],
            history: ['', [
                Validators.minLength(1)
            ]],
            review: ['', [
                Validators.minLength(1)
            ]],
            createdAt: [new Date()],
        })
    }
}
