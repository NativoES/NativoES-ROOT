import { ManagedUpload } from 'aws-sdk/clients/s3';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import s3 from '../../config/uploadFile';

export class FileService {

 private bucketName = 'fastcash-app-dev';

  public async uploadFile(
    file: Express.Multer.File,
    fileName: string
  ): Promise<ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    return s3.upload(params).promise();
  }

  public async uploadFileToS3(
    file: Express.Multer.File,
    fileName: string
  ): Promise<ManagedUpload.SendData> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const result = await s3.upload(params).promise();
      return result;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error('Error uploading file to S3');
    }
  }

  public async getFile(fileName: string): Promise<GetObjectOutput> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${fileName}`,
    };
    return s3.getObject(params).promise();
  }

  public async deleteFile(fileName: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${fileName}`,
    };
    await s3.deleteObject(params).promise();
  }

  public getSignedUrl(fileName: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `uploads/${fileName}`,
      Expires: 60 * 5,
    };
    return s3.getSignedUrlPromise('getObject', params);
  }
}

