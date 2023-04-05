import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
    selector: 'document-form',
    templateUrl: './document-form.component.html',
})
export class DocumentFormComponent {
    public documentForm = this.getDocumentForm();

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly dynamicDialogRef: DynamicDialogRef,
    ) {
    }

    public submit() {
        if (this.documentForm.invalid) {
            return;
        }

        const document = this.documentForm.value;
        this.dynamicDialogRef.close(document);
    }

    public reset() {
        this.documentForm = this.getDocumentForm();
    }


    private getDocumentForm() {
        return this.formBuilder.nonNullable.group({
            title: ['', [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(64)
            ]],
            content: ['', [
                Validators.required,
                Validators.minLength(1)
            ]],
        })
    }
}
