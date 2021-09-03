 Vernam proposed a bit-wise exclusive or of the message stream with a truely random zero-one stream which was shared by sender and receipient.

	Example:

        SENDING
        -------
        message: 0 0 1 0 1 1 0 1 0 1 1 1 ...
        pad:     1 0 0 1 1 1 0 0 1 0 1 1 ...
        XOR      ---------------------------
        cipher:  1 0 1 1 0 0 0 1 1 1 0 0 ...

        RECEIVING
        ---------
        cipher:  1 0 1 1 0 0 0 1 1 1 0 0 ...
        pad:     1 0 0 1 1 1 0 0 1 0 1 1 ...
        XOR      ---------------------------
        message: 0 0 1 0 1 1 0 1 0 1 1 1 ...  


This cipher is unbreakable in a very strong sense. The intuition is that any message can be transformed into any cipher (of the same length) by a pad, and all transformations are equally likely. Given a two letter message, there is a pad which adds to the message to give OK, and another pad which adds to the message to give NO. Since either of these pads are equally likely, the message is equally likely to be OK or NO.

For more details on the topic, [click here](docs/lec1.pdf)
