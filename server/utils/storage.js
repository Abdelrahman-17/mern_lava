import { S3 } from 'aws-sdk';

import { aws } from '../config/keys';

export async function s3Upload(image) {
    let imageUrl = '';
    let imageKey = '';

    if (image) {
        const s3bucket = new S3({
            accessKeyId: aws.accessKeyId,
            secretAccessKey: aws.secretAccessKey,
            region: aws.region
        });

        const params = {
            Bucket: aws.bucketName,
            Key: image.originalname,
            Body: image.buffer,
            ContentType: image.mimetype
        };

        const s3Upload = await s3bucket.upload(params).promise();

        imageUrl = s3Upload.Location;
        imageKey = s3Upload.key;
    }

    return { imageUrl, imageKey };
}
