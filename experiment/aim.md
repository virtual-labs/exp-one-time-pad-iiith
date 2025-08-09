A private-key encryption scheme consists of a set of all possible messages, called the message space **M**, and three algorithms, namely:

(a) **Gen** - Key Generation Algorithm

(b) **Enc** - Encryption Algorithm

(c) **Dec** - Decryption Algorithm

The algorithm for key generation **Gen** is used to choose a key **k** at random from the set of all possible secret keys, denoted by the key space **K**.

The algorithm for encryption **Enc** takes as inputs the message **m** and the secret key **k** and outputs the ciphertext **c**.

The algorithm for decryption **Dec** inputs the ciphertext **c** and the key **k** and outputs the message **m**.

Perfect secrecy represents the gold standard of cryptographic security - an encryption scheme where the ciphertext reveals absolutely no information about the underlying plaintext, regardless of the computational power available to an adversary. Understanding both the theoretical elegance and practical limitations of perfect secrecy is fundamental to modern cryptography.

**About the experiment:**

In this experiment, we explore the Vernam cipher (One-Time Pad), developed by Gilbert Vernam in 1917, which represents the only known encryption method that achieves perfect secrecy. The Vernam cipher demonstrates a fundamental trade-off between absolute security and practical convenience - its security depends critically on using truly random keys that are:

- At least as long as the message itself
- Used exactly once and never reused
- Kept completely secret and securely distributed

Your task is to understand when the Vernam cipher achieves perfect secrecy and when improper implementation introduces vulnerabilities. Through interactive scenarios, you will:

- Experience proper one-time pad encryption that achieves perfect secrecy
- Discover how key reuse, short keys, and predictable patterns destroy security
- Learn why perfect secrecy requires keys as large as the message space
- Understand why theoretically perfect encryption is often impractical in real-world applications

This experiment reveals Shannon's fundamental insight: any perfectly secure encryption scheme requires a keyspace at least as large as the message space, making perfect secrecy theoretically elegant but practically challenging to implement.
