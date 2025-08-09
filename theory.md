### Vernam Cipher and Perfect Secrecy

The **Vernam cipher**, also known as the **One-Time Pad (OTP)**, was proposed by Gilbert Vernam in 1917. It performs a bit-wise exclusive OR (XOR) of the message stream with a truly random key stream that is shared between sender and recipient.

#### Mathematical Foundation

**Encryption:** `C[i] = M[i] ⊕ K[i]`  
**Decryption:** `M[i] = C[i] ⊕ K[i]`

Where:

- `M[i]` = i-th bit of the message
- `K[i]` = i-th bit of the key
- `C[i]` = i-th bit of the ciphertext
- `⊕` = XOR operation

#### Example

```
SENDING
-------
message: 0 0 1 0 1 1 0 1 0 1 1 1 ...
key:     1 0 0 1 1 1 0 0 1 0 1 1 ...
XOR      ---------------------------
cipher:  1 0 1 1 0 0 0 1 1 1 0 0 ...

RECEIVING
---------
cipher:  1 0 1 1 0 0 0 1 1 1 0 0 ...
key:     1 0 0 1 1 1 0 0 1 0 1 1 ...
XOR      ---------------------------
message: 0 0 1 0 1 1 0 1 0 1 1 1 ...
```

### Perfect Secrecy (Shannon's Definition)

An encryption scheme has **perfect secrecy** if:

**P(M = m | C = c) = P(M = m)** for all messages m and ciphertexts c

This means that observing the ciphertext provides no information about the plaintext.

#### Requirements for Perfect Secrecy

1. **Key Length**: Key must be at least as long as the message
2. **Key Randomness**: Key must be truly random
3. **Key Usage**: Each key must be used only once (one-time pad)
4. **Key Distribution**: Secure key sharing between parties

### Why Vernam Cipher Achieves Perfect Secrecy

The intuition is that any message can be transformed into any ciphertext (of the same length) by choosing an appropriate key, and all such transformations are equally likely. Given a two-bit message, there exists a key that transforms the message to give "01", and another key that transforms it to give "10". Since both keys are equally likely, the message is equally likely to be either possibility.

### Practical Limitations

1. **Key Management**: Requires secure distribution of keys as long as messages
2. **Key Storage**: Large storage requirements for long messages
3. **Key Generation**: Need for truly random key generation
4. **One-Time Use**: Keys cannot be reused without compromising security

### Breaking Perfect Secrecy

When keys are:

- **Too short** (repeated/extended)
- **Reused** for multiple messages
- **Not truly random**

The scheme becomes vulnerable to cryptanalysis and no longer provides perfect secrecy.

For more mathematical details, [click here](docs/lec1.pdf)
