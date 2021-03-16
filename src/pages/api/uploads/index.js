import mime from 'mime-types';
import { nanoid, } from 'nanoid';
import { getSession, } from 'next-auth/client';
import { s3, } from '../../../utils/s3';

// Created a signed url that is used by the client to upload a video
export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (session) {
      if (req.method === 'POST') {
        const { type, chunks } = JSON.parse(req.body);
        const video_id = nanoid();

        const { UploadId, Key } = await s3.createMultipartUpload({
          Bucket: 'cdn.bken.io',
          ContentType: type,
          Key: `tmp/${video_id}/${video_id}.${mime.extension(type)}`,
        }).promise();

        const urls = [];
        for (let i = 1; i <= chunks; i++) {
          urls.push(
            s3.getSignedUrl('uploadPart', {
              Key,
              UploadId,
              PartNumber: i,
              Expires: 43200,
              Bucket: 'cdn.bken.io',
            })
          );
        }

        res.send({ uploadId: UploadId, key: Key, urls, video_id });
      }
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}