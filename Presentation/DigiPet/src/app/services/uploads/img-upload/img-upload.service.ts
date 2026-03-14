import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, type FirebaseStorage } from 'firebase/storage';

import { environment } from './../../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class ImgUploadService {
	private storage: FirebaseStorage;

	constructor() {
		const app = getApps().length ? getApp() : initializeApp(environment.firebase);
		this.storage = getStorage(app);
	}

	public getImage(filePath: string): Observable<string> {
		return from(getDownloadURL(ref(this.storage, filePath)));
	}

	public uploadFile(filePath: string, file: File): Observable<number> {
		return new Observable<number>(observer => {
			const uploadTask = uploadBytesResumable(ref(this.storage, filePath), file);

			uploadTask.on('state_changed',
				snapshot => {
					if (snapshot.totalBytes > 0) {
						const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						observer.next(progress);
					}
				},
				error => observer.error(error),
				() => {
					observer.next(100);
					observer.complete();
				}
			);

			return () => {
				uploadTask.cancel();
			};
		});
	}

}
