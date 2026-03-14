import { Component, Input } from '@angular/core';

@Component({
	selector: 'ngx-loading',
	standalone: false,
	template: `
		<div class="ngx-loading-overlay" *ngIf="show">
			<div class="ngx-loading-spinner" aria-label="Loading"></div>
		</div>
	`,
	styles: [
		`.ngx-loading-overlay {
			position: fixed;
			inset: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, 0.1);
			z-index: 2000;
		}
		.ngx-loading-spinner {
			width: 3rem;
			height: 3rem;
			border-radius: 50%;
			border: 0.35rem solid rgba(255, 255, 255, 0.35);
			border-top-color: #ffffff;
			animation: ngx-loading-spin 0.8s linear infinite;
		}
		@keyframes ngx-loading-spin {
			to {
				transform: rotate(360deg);
			}
		}`
	]
})
export class NgxLoadingShimComponent {
	@Input() public show = false;
}
