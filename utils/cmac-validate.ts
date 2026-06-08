import { createCipheriv, timingSafeEqual } from 'crypto'

/**
 * Validates NTAG 424 DNA SUN message CMAC
 *
 * The NTAG 424 DNA computes CMAC using AES-128-CBC over:
 *   input = UID bytes + SDMReadCtr bytes (little-endian, 3 bytes)
 *
 * The first 8 bytes of the cipher output are the CMAC
 */
export function validateCMAC(
  uid: string,     // hex string from URL — chip hardware UID
  cmac: string,    // hex string from URL — SUN message CMAC
  ctr: number,     // integer from URL — SDMReadCtr (monotonic counter)
  key: Buffer      // AES-128 key (16 bytes) from Supabase Vault
): boolean {
  try {
    // Convert uid from hex to bytes
    const uidBytes = Buffer.from(uid.replace(/:/g, ''), 'hex')

    // Encode counter as 3 bytes little-endian
    const ctrBytes = Buffer.alloc(3)
    ctrBytes.writeUIntLE(ctr & 0xFFFFFF, 0, 3)

    // Build CMAC input: UID + counter
    const input = Buffer.concat([uidBytes, ctrBytes])

    // Pad input to 16 bytes (AES block size)
    const padded = Buffer.alloc(16)
    input.copy(padded, 0, 0, Math.min(input.length, 16))

    // AES-128-CBC with zero IV
    const iv = Buffer.alloc(16, 0)
    const cipher = createCipheriv('aes-128-cbc', key, iv)
    cipher.setAutoPadding(false)
    const encrypted = cipher.update(padded)

    // CMAC is first 8 bytes of AES output
    const computedCMAC = encrypted.subarray(0, 8)
    const providedCMAC = Buffer.from(cmac.replace(/:/g, ''), 'hex').subarray(0, 8)

    if (computedCMAC.length !== providedCMAC.length) return false

    // Constant-time comparison — prevents timing attacks
    return timingSafeEqual(computedCMAC, providedCMAC)
  } catch (err) {
    console.error('CMAC validation error:', err)
    return false
  }
}

/**
 * Validates monotonic counter to prevent replay attacks
 */
export function isCounterValid(newCtr: number, lastSeenCtr: number): boolean {
  return newCtr > lastSeenCtr
}
