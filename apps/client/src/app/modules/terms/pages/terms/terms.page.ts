import {Component, OnInit} from '@angular/core';
import {Document} from '../../interfaces';
import {firstValueFrom} from 'rxjs';
import {DialogService} from 'primeng/dynamicdialog';
import {DocumentFormComponent} from '../../components';
import {SearchModel} from '../../interfaces/search-model.interface';
import {StandardBooleanSearchModel, VectorSpaceSearchModel} from '../../search-models';

@Component({
    selector: 'terms-page',
    templateUrl: './terms.page.html',
    providers: [DialogService],
})
export class TermsPage implements OnInit {
    private standardBooleanSearchModel = new StandardBooleanSearchModel();
    private vectorSpaceSearchModel = new VectorSpaceSearchModel();

    public query = '';
    public resultDocuments: Document[] = [];
    public indexTerms: string[] = [];
    public documents: Document[] = [];

    public currentSearchModel: string = StandardBooleanSearchModel.name;
    public searchModelOptions = [
        {
            model: StandardBooleanSearchModel.name,
            label: 'Boolean',
        },
        {
            model: VectorSpaceSearchModel.name,
            label: 'Vector',
        }
    ];

    constructor(
        private readonly dialogsService: DialogService,
    ) {
    }

    ngOnInit() {
        for (const document of this.documents) {
            this.indexDocument(document);
        }
    }

    public async createDocument() {
        const dialogRef = this.dialogsService.open(DocumentFormComponent, {
            header: 'Create new Document',
            width: '65%',
            maximizable: true,
            dismissableMask: true,
        });

        const document: Document | void = await firstValueFrom(dialogRef.onClose);

        if (!document) {
            return;
        }

        this.documents = [...this.documents, document];
        this.indexDocument(document);
    }

    public resetDocuments() {
        this.documents = [];
        this.resultDocuments = [];
        this.standardBooleanSearchModel = new StandardBooleanSearchModel();
        this.vectorSpaceSearchModel = new VectorSpaceSearchModel();
    }

    public search() {
        this.resultDocuments = this
            .getCurrentSearchModel()
            .search(this.query);
    }

    private indexDocument(document: Document) {
        this.standardBooleanSearchModel.index(document, this.indexTerms);
        this.vectorSpaceSearchModel.index(document, this.indexTerms);
    }

    private getCurrentSearchModel(): SearchModel {
        if (this.currentSearchModel === StandardBooleanSearchModel.name) {
            return this.standardBooleanSearchModel;
        }

        return this.vectorSpaceSearchModel;
    }
}
