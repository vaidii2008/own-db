import { check, eq, eqBytes, report } from "./harness.js";

// A record is 42 bytes:
//   offset  size  field    type
//        0     4  id       unsigned 32-bit, big-endian
//        4    32  name     UTF-8, zero-padded to fill the field
//       36     6  pointer  unsigned 48-bit, big-endian (a disk offset)

export const ID_OFFSET = 0;
export const ID_SIZE = 4;
export const NAME_OFFSET = 4;
export const NAME_SIZE = 32;
export const POINTER_OFFSET = 36;
export const POINTER_SIZE = 6;
export const RECORD_SIZE = ID_SIZE + NAME_SIZE + POINTER_SIZE;

export interface Rec {
  id: number;
  name: string;
  pointer: number;
}

export function encodeRecord(rec: Rec): Buffer {
  throw new Error("TODO: implement encodeRecord");
}

export function decodeRecord(buf: Buffer): Rec {
  throw new Error("TODO: implement decodeRecord");
}

async function main() {
  console.log("\nDRILL 1 - Fixed-width binary records\n");

  await check("record is exactly 42 bytes", () => {
    eq(encodeRecord({ id: 1, name: "alice", pointer: 0 }).length, RECORD_SIZE);
  });

  await check("round-trips a simple record", () => {
    const rec = { id: 42, name: "alice", pointer: 4096 };
    eq(decodeRecord(encodeRecord(rec)), rec);
  });

  await check("id is big-endian", () => {
    const buf = encodeRecord({ id: 258, name: "", pointer: 0 });
    eqBytes(buf.subarray(0, 4), Buffer.from([0x00, 0x00, 0x01, 0x02]));
  });

  report("DRILL 1");
}

main();
