import { Component, OnInit } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { PhotoEffectService } from '../_services/photo-effect.service';

@Component({
  selector: 'app-invert',
  templateUrl: './invert.component.html',
  styleUrls: ['./invert.component.scss']
})
export class InvertComponent implements OnInit {

  selectedFile!: File;
  selectedImageUrl!: SafeUrl;
  resultImageUrl!: SafeUrl;

  constructor(
    private photoEffectService: PhotoEffectService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.selectedImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
  }

  applyEffect(): void {
    if (this.selectedFile) {
      this.photoEffectService.applyInvertEffect(this.selectedFile)
        .subscribe((result: Blob) => {
          const url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result));
          this.resultImageUrl = url;
        });
    }
  }

downloadResultImage(): void {
    if (this.resultImageUrl) {
      const link = document.createElement('a');
      link.href = <string>this.resultImageUrl;
      link.download = 'result_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
