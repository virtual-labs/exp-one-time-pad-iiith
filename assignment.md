1. Prove that the Vernam cipher (One-Time Pad) achieves perfect secrecy when the key satisfies all required conditions. Your proof should demonstrate that for any two plaintexts of equal length, every possible ciphertext has equal probability of being produced by either plaintext.

2. Consider two messages M₁ = "10110" and M₂ = "01101" encrypted with the same key K = "11001" using the Vernam cipher:

   - Calculate C₁ = M₁ ⊕ K and C₂ = M₂ ⊕ K
   - Show how an adversary can compute M₁ ⊕ M₂ directly from C₁ and C₂
   - Explain why this information leakage violates perfect secrecy

3. What is the minimum key length required to achieve perfect secrecy when encrypting a message of length n bits using the Vernam cipher? Justify your answer using Shannon's theorem and provide a counterexample showing what happens when the key is shorter than this minimum.

4. Design a practical scenario where you need to send three 8-bit messages securely using the One-Time Pad:

   - Calculate the total key material required
   - Describe the key distribution challenges
   - Propose solutions for the key management problems
   - Explain why these challenges make perfect secrecy difficult in practice

5. Suppose an attacker intercepts multiple ciphertexts encrypted with keys that contain predictable patterns (e.g., alternating 0s and 1s). Demonstrate how statistical analysis can be used to:

   - Identify the key pattern from multiple ciphertexts
   - Recover portions of the original plaintexts
   - Show that this violates perfect secrecy

6. Compare the Vernam cipher with the shift cipher in terms of:

   - Key space size relative to message space
   - Conditions required for perfect secrecy
   - Practical implementation challenges
   - Resistance to different types of attacks
     Explain why the Vernam cipher can achieve perfect secrecy while the shift cipher cannot, even when properly implemented.
