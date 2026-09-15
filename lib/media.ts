import "server-only";

import { desc } from "drizzle-orm";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { mediaAssets, type MediaAssetRow } from "@/db/schema";
import { getDb } from "@/lib/db";
import { allowJsonFallback } from "@/lib/env";

export type MediaAsset = {
  id: string;
  path: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  alt: string;
  createdAt: string;
};

const uploadsDir = path.join(process.cwd(), "public/uploads");
const allowedMime = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"]);

function toMedia(row: MediaAssetRow): MediaAsset {
  return {
    id: row.id,
    path: row.path,
    originalName: row.originalName,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    alt: row.alt,
    createdAt: row.createdAt.toISOString(),
  };
}

function extensionFor(mimeType: string, originalName: string) {
  const fromName = path.extname(originalName).toLowerCase();
  if (fromName && fromName.length <= 8) return fromName;
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/jpeg") return ".jpg";
  if (mimeType === "image/webp") return ".webp";
  if (mimeType === "image/gif") return ".gif";
  if (mimeType === "image/svg+xml") return ".svg";
  return ".bin";
}

export async function listMediaAssets(): Promise<MediaAsset[]> {
  try {
    const rows = await getDb().select().from(mediaAssets).orderBy(desc(mediaAssets.createdAt));
    return rows.map(toMedia);
  } catch (error) {
    console.log("Database unavailable, media library empty until DB is connected");
    if (!allowJsonFallback()) throw error;
    return [];
  }
}

export async function saveUploadedMedia(file: File, alt = ""): Promise<MediaAsset> {
  if (!allowedMime.has(file.type)) {
    throw new Error("Unsupported image type. Use PNG, JPEG, WebP, GIF, or SVG.");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Image must be 8MB or smaller.");
  }

  await mkdir(uploadsDir, { recursive: true });
  const id = `media_${randomUUID()}`;
  const filename = `${id}${extensionFor(file.type, file.name)}`;
  const publicPath = `/uploads/${filename}`;
  const absolutePath = path.join(uploadsDir, filename);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(absolutePath, bytes);

  const asset: MediaAsset = {
    id,
    path: publicPath,
    originalName: file.name || filename,
    mimeType: file.type,
    sizeBytes: file.size,
    alt: alt.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    await getDb().insert(mediaAssets).values({
      id: asset.id,
      path: asset.path,
      originalName: asset.originalName,
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
      alt: asset.alt,
    });
  } catch (error) {
    console.log("Database unavailable, uploaded image saved to disk only");
    if (!allowJsonFallback()) throw error;
  }

  return asset;
}
