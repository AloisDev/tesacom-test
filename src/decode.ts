import { Buffer } from "buffer";
import { Format } from "./types/object-type.types";

/**
 * 
 * @param buffer 
 * @param format 
 */
export function decode(buffer: Buffer, format: Format[]) {
    let data: any = {};
    let offset = 0;
    for (let field of format) {
        if (field.type === 'uint' || field.type === 'int') {
            data[field.tag] = buffer.readUIntBE(offset, Math.ceil(field.len! / 8));
            offset += Math.ceil(field.len! / 8);
        } else if (field.type === 'float') {
            data[field.tag] = buffer.readFloatBE(offset);
            offset += 4;
        } else if (field.type === 'ascii') {
            let endOffset = buffer.indexOf('\0', offset);
            data[field.tag] = buffer.toString('ascii', offset, endOffset);
            offset = endOffset + 1;
        }
    }
    return data;
}