import { UploadFileDTO } from "../../modules/links/dtos/upload-file.dto";

export const LinksStorageProvider = Symbol("LinksStorageProvider");

export abstract class StorageProvider {
  abstract upload(data: UploadFileDTO): Promise<{ url: string }>
}