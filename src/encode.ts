import { Buffer } from 'buffer';
import { Format } from './types/object-type.types'


/**
 * 
 * @param _object 
 * @param format 
 * @returns 
 */
export function encode(_object: any, format: Format[]) {

    let buffer = Buffer.alloc(0);
    for (let field of format) {
        let value = _object[field.tag];
        if (field.type === 'uint' || field.type === 'int') {
            let tempBuffer = Buffer.alloc(Math.ceil(field.len! / 8));
            tempBuffer.writeUIntBE(value, 0, Math.ceil(field.len! / 8));
            buffer = Buffer.concat([buffer, tempBuffer]);
        } else if (field.type === 'float') {
            let tempBuffer = Buffer.alloc(4);
            tempBuffer.writeFloatBE(value, 0);
            buffer = Buffer.concat([buffer, tempBuffer]);
        } else if (field.type === 'ascii') {
            let tempBuffer = Buffer.from(value, 'ascii');
            buffer = Buffer.concat([buffer, tempBuffer]);
        }
    }
    return buffer;
}