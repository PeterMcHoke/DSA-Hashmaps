class HashMap {
    constructor(initialCapacity=8) {
        this.length = 0;
        this._deleted = 0;
        this._capacity = initialCapacity;
        this._hashTable = [];
    }

    get(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index]
        if (slot === undefined) {
            return undefined;
        }
        return slot.value;
    }

    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }

    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index]
        if (!!slot) {
            throw new Error('Key error, could not find key')
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
    //using open addressing
    //Alvaro, could this be a static method? I am thinking not, beacuse it has to use this._capacity which is specific to each instance of the HashMap class. 
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            //Alvaro, why do we have to do i % capacity again when we already have i giving us an index from start = hash % capacity?
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            //If the slot is empty, or if it has the same key that we are looking for, updated the slot with the new key value pair.
            //This has to happen because in this.set() we make sure that we have enough capacity using loadRatio.
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }
    

    _resize(size) {
        //get a copy of our hashTable
        const oldSlots = this._hashTable;
        this._capacity = size;
        //reset these variables, they will get rebuilt when we call set below (or delete later)
        this.length = 0;
        this._deleted = 0;
        this._hashTable = [];
        //Alvaro, won't this just push all of the slots to the begginning making our open addressing less performant?
        //Then we are basically just pushing every new key to the end like an array.
        //However, this only happens when we need to resize which is much less frequent with hash maps.
        for (const slot of oldSlots) {
            if (slot !== undefined && !slot.DELETED) {
                this.set(slot.key, slot.value)
            }
        }

    }

    //when a method is the same for every instance of a class and doesn't rely on information about the current instance, make it static
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            //Bitwise left shift with 5 0s - this would be similar to
            //hash*31, 31 being the decent prime number
            //but bit shifting is a faster way to do this
            //tradeoff is understandability
            hash = (hash << 5) + hash + string.charCodeAt(i);
            //converting hash to a 32 bit integer
            hash = hash & hash;
        }
        //making sure hash is unsigned - meaning non-negative number. 
        return hash >>> 0;
    }
}


module.exports = HashMap;
