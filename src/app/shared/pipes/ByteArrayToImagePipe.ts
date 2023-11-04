import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'byteArrayToImage'})
export class ByteArrayToImagePipe implements PipeTransform {
  transform(value: Uint8Array): string {
    let TYPED_ARRAY = new Uint8Array(value);
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
    }, '');
    let base64String = btoa(STRING_CHAR);
    return `data:image/jpeg;base64,${base64String}`;
  }
}
