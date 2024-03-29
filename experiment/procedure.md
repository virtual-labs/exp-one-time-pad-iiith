**STEP 1 :** Select a plain text and a key by clicking on the Next buttons next to the respective fields.

**STEP 2 :** If the generated key is biased, make it unbiased in 0 and 1, and use it. You can use the idea given in theory part.

**STEP 3 :** On clicking on "Encrypt" button, you will get the ciphertext for the same encryption scheme. You can get the cipher text for as many plaintext and key pairs as you like for the same encryption scheme. You can change the encryption scheme too if you want.

**STEP 4 :** You can take a look at all the possible 2^(length of plaintext + length of key) tuples of plaintext, key and ciphertext in the next block.

**STEP 5 :** By observing the tuples obtained above, you need to tell if the encryption scheme being used is secure or not. If not, you need to find the message, m and ciphertext, c such that P(M=m|C=c) = P(M=m). In the experiment the size of the message space and that of the key space are equal. Thus from Shannon's theorem, to show that a scheme is not perfect, it is enough if you locate two distinct plaintexts that are encrypted to obtain the same ciphertext for the same key
