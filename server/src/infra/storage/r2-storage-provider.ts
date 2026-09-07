import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { injectable } from "tsyringe";
import { StorageProvider } from "./storage-provider";
import { UploadFileDTO } from "../../modules/links/dtos/upload-file.dto";
import { env } from "../../env";
import { AppError } from "../../shared/errors/app-error";

@injectable()
export class R2StorageProvider implements StorageProvider {
    private readonly client: S3Client;
    private readonly bucket: string;
    private readonly publicUrl: string;


  constructor() {
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = env.CLOUDFLARE_ACCESS_KEY_ID;
    const secretAccessKey = env.CLOUDFLARE_SECRET_ACCESS_KEY;
    const bucket = env.CLOUDFLARE_BUCKET;
    const publicUrl = env.CLOUDFLARE_PUBLIC_URL;

    if (!accountId || !accessKeyId || !secretAccessKey || !bucket || !publicUrl) {
        throw new AppError("Cloudflare storage is not configured", 500);
    }

    this.bucket = bucket;
    this.publicUrl = publicUrl;
    this.client = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey },
    });
  }

  async upload(data: UploadFileDTO): Promise<{ url: string }> {
    await this.client.send(new PutObjectCommand({
      Bucket: this.bucket,
      Key: data.key,
      Body: data.body,
      ContentType: data.contentType,
    }))

    return { url: `${this.publicUrl}/${data.key}` }
  }
}