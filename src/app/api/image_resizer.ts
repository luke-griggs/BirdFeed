
function resizeImage(file: File, maxWidth: number, maxHeight: number, callback: (blob: Blob) => void): void {
    const reader = new FileReader();
    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            let width = image.width;
            let height = image.height;

            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(image, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) callback(blob);
                }, 'image/jpeg', 0.95);
            }
        };
        image.src = readerEvent.target!.result as string;
    };
    reader.readAsDataURL(file);
}

export { resizeImage };
