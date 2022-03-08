import { TestBed } from "@angular/core/testing";
import { CountFrequentlyWordsService } from "./count-frequently-words.service"

describe('CountFrequentlyWordsService', () => {

    let countFrequentlyWordsService: CountFrequentlyWordsService;
    const dataInput = {
        "id": 9195,
        "uid": "3dd3df32-53d3-4546-9e9d-abd1d06a4fce",
        "name": "305 Pub",
        "type": "Bar",
        "description": "Our mission is to be a leader in the distribution and merchandising of food, pharmacy, health and personal care items, seasonal merchandise, and related products and services. We place considerable importance on forging strong supplier partnerships. Our suppliers, large or small, local or global, are essential components in accomplishing our mission.",
        "review": "Ambience was good, service was no nonsense but friendly.",
        "logo": "https://loremflickr.com/500/500/restaurant",
        "phone_number": "(801) 310-6665",
        "address": "92544 O'Keefe Trafficway, Lake Merissaville, AK 90579-0731",
    }
    const topTenWords: [string, number][] = [
        ['and', 4],
        ['in', 2],
        ['or', 2],
        ['Our', 2],
        ['a', 1],
        ['accomplishing', 1],
        ['are', 1],
        ['be', 1],
        ['care', 1],
        ['components', 1],
    ];
    beforeEach(() => {
        countFrequentlyWordsService = TestBed.inject(CountFrequentlyWordsService);
    });

    it('should be created', () => {
        expect(countFrequentlyWordsService).toBeTruthy();
    });

    it('should show the longest', () => {
        expect(countFrequentlyWordsService.getLongestWord(dataInput)).toEqual(dataInput.description.split(' '));
    });

    it('should show top ten words', () => {
        const topWordsUsed = countFrequentlyWordsService.topTenWords(dataInput);
        for (let i = 0; i < topTenWords.length; i++) {
            expect(topTenWords[i][0]).toEqual(topWordsUsed[i][0]);
            expect(topTenWords[i][1]).toEqual(topWordsUsed[i][1]);
        }
    });
})