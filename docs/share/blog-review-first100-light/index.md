---
hide:
  - navigation
  - toc
---

# First 100 Examples from `train_hn_skip1.jsonl` (Light Package)

This page is shared via direct link and is intentionally not listed in the public blog index.

[Download the ZIP bundle](./blog_review_first100_light.zip)

---

This lightweight export is optimized for blog use. Each example includes the positive screenshot and the first hard-negative screenshot. Confirmed false-negative cases include extra screenshots.

## Summary

- Included per example: `positive` + `top-1 hard negative`
- Confirmed false-negative entries: `#7`, `#19`
- Borderline but unconfirmed: `#87`

---

## Example 1

**Query:** What is the place of birth of Nolan Mbemba?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_661/shard_00002/5478377.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_302/shard_00002/2504584.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 1 positive](assets/pos_001.png)

**Top-1 hard negative screenshot**

![Example 1 top hard negative](assets/topneg_001.png)

---

## Example 2

**Query:** Which university appointed Derek Burney as its 8th Chancellor on January 24, 2013?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_265/shard_00009/2198035.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_265/shard_00009/2198036.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 2 positive](assets/pos_002.png)

**Top-1 hard negative screenshot**

![Example 2 top hard negative](assets/topneg_002.png)

---

## Example 3

**Query:** Which team finished in first place in the 1912 PCL standings?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_008/shard_00012/73090.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_009/shard_00001/75969.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 3 positive](assets/pos_003.png)

**Top-1 hard negative screenshot**

![Example 3 top hard negative](assets/topneg_003.png)

---

## Example 4

**Query:** Which members performed the song "Hashire! Penguin" for the 2020 BNK48 and CGM48 release?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_183/shard_00000/1516198.png.tiles/chunk_0000_05.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_743/shard_00003/6158388.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 4 positive](assets/pos_004.png)

**Top-1 hard negative screenshot**

![Example 4 top hard negative](assets/topneg_004.png)

---

## Example 5

**Query:** On what date did a hurricane sweep over New Orleans, damaging the Spanish fleet?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_191/shard_00010/1586469.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_734/shard_00005/6086363.png.tiles/chunk_0001_06.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 5 positive](assets/pos_005.png)

**Top-1 hard negative screenshot**

![Example 5 top hard negative](assets/topneg_005.png)

---

## Example 6

**Query:** In what year was the Rockaway Quarry sold to Howard Marks?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_775/shard_00002/6422565.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_173/shard_00009/1436293.png.tiles/chunk_0000_07.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 6 positive](assets/pos_006.png)

**Top-1 hard negative screenshot**

![Example 6 top hard negative](assets/topneg_006.png)

---

## Example 7

**Query:** Which historic mission church in Monterey County is listed in the screenshot?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_565/shard_00002/4683218.png.tiles/chunk_0000_06.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_551/shard_00004/4569325.png.tiles/chunk_0000_06.png`  

**Review note:** Confirmed false negatives caused by a multi-answer mission-list query.  

**Positive screenshot**

![Example 7 positive](assets/pos_007.png)

**Top-1 hard negative screenshot**

![Example 7 top hard negative](assets/topneg_007.png)

**Confirmed false-negative screenshots**

- `/opt/dlami/nvme/kiwix_tiles/shard_551/shard_00004/4569325.png.tiles/chunk_0000_06.png`  
  Reason: This negative still lists Monterey County mission churches, including valid answers.

![Example 7 false negative 1](assets/false_neg_007_1.png)

- `/opt/dlami/nvme/kiwix_tiles/shard_735/shard_00006/6094896.png.tiles/chunk_0000_05.png`  
  Reason: This negative also directly contains Monterey County mission church answers.

![Example 7 false negative 2](assets/false_neg_007_2.png)

- `/opt/dlami/nvme/kiwix_tiles/shard_619/shard_00007/5135420.png.tiles/chunk_0000_04.png`  
  Reason: This continuation chunk still exposes a valid mission answer.

![Example 7 false negative 3](assets/false_neg_007_3.png)

- `/opt/dlami/nvme/kiwix_tiles/shard_619/shard_00007/5135410.png.tiles/chunk_0000_03.png`  
  Reason: This continuation chunk still exposes a valid mission answer.

![Example 7 false negative 4](assets/false_neg_007_4.png)

---

## Example 8

**Query:** What is another name for training simulation?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_915/shard_00006/7586258.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_826/shard_00000/6842784.png.tiles/chunk_0002_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 8 positive](assets/pos_008.png)

**Top-1 hard negative screenshot**

![Example 8 top hard negative](assets/topneg_008.png)

---

## Example 9

**Query:** In which city is the bronze torso of Pedubast I currently located?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_700/shard_00000/5799140.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_035/shard_00001/291157.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 9 positive](assets/pos_009.png)

**Top-1 hard negative screenshot**

![Example 9 top hard negative](assets/topneg_009.png)

---

## Example 10

**Query:** Who wrote a letter in July 1754 mentioning the Windham frog incident to his nephew, Ezra Stiles?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_143/shard_00001/1185970.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_143/shard_00001/1185970.png.tiles/chunk_0001_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 10 positive](assets/pos_010.png)

**Top-1 hard negative screenshot**

![Example 10 top hard negative](assets/topneg_010.png)

---

## Example 11

**Query:** What is the occupation of Shmuel Kamenetsky according to his infobox?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_820/shard_00005/6798520.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_349/shard_00002/2894089.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 11 positive](assets/pos_011.png)

**Top-1 hard negative screenshot**

![Example 11 top hard negative](assets/topneg_011.png)

---

## Example 12

**Query:** What was the population of the village of Güngören in 2022?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_381/shard_00006/3163328.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_381/shard_00004/3161453.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 12 positive](assets/pos_012.png)

**Top-1 hard negative screenshot**

![Example 12 top hard negative](assets/topneg_012.png)

---

## Example 13

**Query:** Who was the referee for the 1987 rugby match between New Zealand and France?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_021/shard_00006/180127.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_017/shard_00004/145197.png.tiles/chunk_0000_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 13 positive](assets/pos_013.png)

**Top-1 hard negative screenshot**

![Example 13 top hard negative](assets/topneg_013.png)

---

## Example 14

**Query:** How many votes did Jana Papuckoski receive in the 2018 Ontario general election for the Northumberland—Peterborough South district?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_257/shard_00001/2130801.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_861/shard_00001/7134472.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 14 positive](assets/pos_014.png)

**Top-1 hard negative screenshot**

![Example 14 top hard negative](assets/topneg_014.png)

---

## Example 15

**Query:** What is the birth date of the Lebanese football manager Moussa Hojeij?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_630/shard_00003/5222343.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_630/shard_00003/5222343.png.tiles/chunk_0000_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 15 positive](assets/pos_015.png)

**Top-1 hard negative screenshot**

![Example 15 top hard negative](assets/topneg_015.png)

---

## Example 16

**Query:** In what month and year was the Palmiet Nature Reserve founded?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_689/shard_00002/5709779.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_931/shard_00002/7714884.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 16 positive](assets/pos_016.png)

**Top-1 hard negative screenshot**

![Example 16 top hard negative](assets/topneg_016.png)

---

## Example 17

**Query:** Who is the current mayor of the resort village of B-Say-Tah?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_130/shard_00006/1082950.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_957/shard_00001/7929537.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 17 positive](assets/pos_017.png)

**Top-1 hard negative screenshot**

![Example 17 top hard negative](assets/topneg_017.png)

---

## Example 18

**Query:** Who awarded the 5 km run prize to Mailloux at the 2012 Army Run in Ottawa?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_825/shard_00004/6838965.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_825/shard_00004/6838965.png.tiles/chunk_0000_04.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 18 positive](assets/pos_018.png)

**Top-1 hard negative screenshot**

![Example 18 top hard negative](assets/topneg_018.png)

---

## Example 19

**Query:** Who served as the President of the National Senators of Argentina for the 2011–2013 term?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_144/shard_00012/1199479.png.tiles/chunk_0000_07.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_144/shard_00012/1199479.png.tiles/chunk_0001_07.png`  

**Review note:** Confirmed false negative caused by a continuation chunk that still contains the answer.  

**Positive screenshot**

![Example 19 positive](assets/pos_019.png)

**Top-1 hard negative screenshot**

![Example 19 top hard negative](assets/topneg_019.png)

**Confirmed false-negative screenshots**

- `/opt/dlami/nvme/kiwix_tiles/shard_144/shard_00012/1199479.png.tiles/chunk_0001_07.png`  
  Reason: This continuation chunk still shows "President: Amado Boudou" for the 2011-2013 term.

![Example 19 false negative 1](assets/false_neg_019_1.png)

---

## Example 20

**Query:** In what year did Manfred Mölgg retire from his professional skiing career?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_581/shard_00000/4813951.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_464/shard_00004/3848742.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 20 positive](assets/pos_020.png)

**Top-1 hard negative screenshot**

![Example 20 top hard negative](assets/topneg_020.png)

---

## Example 21

**Query:** In what year did Rideaux start the photo agency PicturePerfect?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_994/shard_00000/8234993.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_495/shard_00002/4102798.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 21 positive](assets/pos_021.png)

**Top-1 hard negative screenshot**

![Example 21 top hard negative](assets/topneg_021.png)

---

## Example 22

**Query:** Who made a cameo appearance as the photographer in the music video for "Obsessed"?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_669/shard_00005/5547710.png.tiles/chunk_0000_07.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_315/shard_00010/2614839.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 22 positive](assets/pos_022.png)

**Top-1 hard negative screenshot**

![Example 22 top hard negative](assets/topneg_022.png)

---

## Example 23

**Query:** On what date was the album "Madame X" by Madonna released?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_045/shard_00014/380416.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_574/shard_00006/4761064.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 23 positive](assets/pos_023.png)

**Top-1 hard negative screenshot**

![Example 23 top hard negative](assets/topneg_023.png)

---

## Example 24

**Query:** Which ship did Samuel Brannan charter to evacuate the eastern Mormons to California?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_797/shard_00001/6603762.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_953/shard_00005/7899847.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 24 positive](assets/pos_024.png)

**Top-1 hard negative screenshot**

![Example 24 top hard negative](assets/topneg_024.png)

---

## Example 25

**Query:** Who was the head coach of the 2012–13 Grambling State Tigers men's basketball team?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_037/shard_00003/309564.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_047/shard_00001/390397.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 25 positive](assets/pos_025.png)

**Top-1 hard negative screenshot**

![Example 25 top hard negative](assets/topneg_025.png)

---

## Example 26

**Query:** How many household viewers watched the original American broadcast of the Brooklyn Nine-Nine episode "Sabotage"?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_791/shard_00001/6554319.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_321/shard_00000/2660040.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 26 positive](assets/pos_026.png)

**Top-1 hard negative screenshot**

![Example 26 top hard negative](assets/topneg_026.png)

---

## Example 27

**Query:** How many total appearances did the football club Doncaster Rovers record for the 2014-15 season?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_568/shard_00002/4708221.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_531/shard_00004/4403729.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 27 positive](assets/pos_027.png)

**Top-1 hard negative screenshot**

![Example 27 top hard negative](assets/topneg_027.png)

---

## Example 28

**Query:** Who created the 1788 mezzotint of Henry Hope?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_399/shard_00004/3309691.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_399/shard_00007/3313095.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 28 positive](assets/pos_028.png)

**Top-1 hard negative screenshot**

![Example 28 top hard negative](assets/topneg_028.png)

---

## Example 29

**Query:** Which island is considered the largest and most populous of the Grenadines?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_375/shard_00006/3113507.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_793/shard_00004/6573878.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 29 positive](assets/pos_029.png)

**Top-1 hard negative screenshot**

![Example 29 top hard negative](assets/topneg_029.png)

---

## Example 30

**Query:** What is the minimum age required to be elected President of the Republic of Albania?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_693/shard_00005/5746550.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_042/shard_00003/351001.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 30 positive](assets/pos_030.png)

**Top-1 hard negative screenshot**

![Example 30 top hard negative](assets/topneg_030.png)

---

## Example 31

**Query:** On what date was Lerew awarded the Distinguished Flying Cross?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_468/shard_00005/3882115.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_544/shard_00001/4508446.png.tiles/chunk_0001_06.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 31 positive](assets/pos_031.png)

**Top-1 hard negative screenshot**

![Example 31 top hard negative](assets/topneg_031.png)

---

## Example 32

**Query:** In what year did the fleet renewal programme to replace the ageing Sulisker type vessels begin?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_807/shard_00002/6687778.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_814/shard_00004/6748228.png.tiles/chunk_0000_04.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 32 positive](assets/pos_032.png)

**Top-1 hard negative screenshot**

![Example 32 top hard negative](assets/topneg_032.png)

---

## Example 33

**Query:** Which racing team won the GTX class at the 2020 12 Hours of Monza?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_128/shard_00002/1062744.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_028/shard_00003/235336.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 33 positive](assets/pos_033.png)

**Top-1 hard negative screenshot**

![Example 33 top hard negative](assets/topneg_033.png)

---

## Example 34

**Query:** Which doctrine became linked in syncretic form with the tathāgatagarbha doctrine?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_873/shard_00003/7235893.png.tiles/chunk_0000_06.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_097/shard_00004/807968.png.tiles/chunk_0001_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 34 positive](assets/pos_034.png)

**Top-1 hard negative screenshot**

![Example 34 top hard negative](assets/topneg_034.png)

---

## Example 35

**Query:** In the game show segment Grocery Bowl, what object do the chefs roll toward the soda bottles?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_380/shard_00002/3150151.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_239/shard_00001/1981932.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 35 positive](assets/pos_035.png)

**Top-1 hard negative screenshot**

![Example 35 top hard negative](assets/topneg_035.png)

---

## Example 36

**Query:** Which airport is the nearest to Martigues?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_590/shard_00006/4894268.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_591/shard_00012/4900830.png.tiles/chunk_0002_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 36 positive](assets/pos_036.png)

**Top-1 hard negative screenshot**

![Example 36 top hard negative](assets/topneg_036.png)

---

## Example 37

**Query:** What is the broadcast frequency of CBO-FM?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_182/shard_00004/1512205.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_182/shard_00004/1512205.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 37 positive](assets/pos_037.png)

**Top-1 hard negative screenshot**

![Example 37 top hard negative](assets/topneg_037.png)

---

## Example 38

**Query:** Which Hungarian violinist did Clara Ward elope with in December 1896?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_220/shard_00002/1825074.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_220/shard_00002/1825074.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 38 positive](assets/pos_038.png)

**Top-1 hard negative screenshot**

![Example 38 top hard negative](assets/topneg_038.png)

---

## Example 39

**Query:** How many points were awarded for a win in the 1989 Copa América?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_022/shard_00009/184898.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_221/shard_00003/1834004.png.tiles/chunk_0000_06.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 39 positive](assets/pos_039.png)

**Top-1 hard negative screenshot**

![Example 39 top hard negative](assets/topneg_039.png)

---

## Example 40

**Query:** Who was the first husband of the actress Joan Woodbury?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_462/shard_00005/3832562.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_694/shard_00008/5757363.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 40 positive](assets/pos_040.png)

**Top-1 hard negative screenshot**

![Example 40 top hard negative](assets/topneg_040.png)

---

## Example 41

**Query:** Who is the founder of the kickboxing promotion World version W5?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_979/shard_00003/8114032.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_979/shard_00000/8110443.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 41 positive](assets/pos_041.png)

**Top-1 hard negative screenshot**

![Example 41 top hard negative](assets/topneg_041.png)

---

## Example 42

**Query:** What is the name of the railway station located in Chandwa?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_203/shard_00002/1683669.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_203/shard_00001/1682925.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 42 positive](assets/pos_042.png)

**Top-1 hard negative screenshot**

![Example 42 top hard negative](assets/topneg_042.png)

---

## Example 43

**Query:** Who did the character L. N. Tondon represent in the 2011 film Chillar Party?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_752/shard_00007/6237463.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_732/shard_00004/6068821.png.tiles/chunk_0000_06.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 43 positive](assets/pos_043.png)

**Top-1 hard negative screenshot**

![Example 43 top hard negative](assets/topneg_043.png)

---

## Example 44

**Query:** How many votes did Sandeep Yadav receive in the 2022 Allahabad North Legislative Assembly election?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_091/shard_00006/759975.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_574/shard_00006/4761202.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 44 positive](assets/pos_044.png)

**Top-1 hard negative screenshot**

![Example 44 top hard negative](assets/topneg_044.png)

---

## Example 45

**Query:** What is the codename for the Fall Creators Update introduced in Windows 10?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_975/shard_00004/8080969.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_975/shard_00003/8080672.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 45 positive](assets/pos_045.png)

**Top-1 hard negative screenshot**

![Example 45 top hard negative](assets/topneg_045.png)

---

## Example 46

**Query:** Who was the referee for the 9 February 2016 match between Nyíregyháza and Debrecen?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_040/shard_00006/338287.png.tiles/chunk_0001_04.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_034/shard_00002/283856.png.tiles/chunk_0001_04.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 46 positive](assets/pos_046.png)

**Top-1 hard negative screenshot**

![Example 46 top hard negative](assets/topneg_046.png)

---

## Example 47

**Query:** On what date did Tohitapu die?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_909/shard_00002/7532952.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_922/shard_00001/7639522.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 47 positive](assets/pos_047.png)

**Top-1 hard negative screenshot**

![Example 47 top hard negative](assets/topneg_047.png)

---

## Example 48

**Query:** Who plays the character of Old Lady Hackmore in the film Ernest Scared Stupid?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_308/shard_00010/2556010.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_402/shard_00007/3337343.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 48 positive](assets/pos_048.png)

**Top-1 hard negative screenshot**

![Example 48 top hard negative](assets/topneg_048.png)

---

## Example 49

**Query:** In which year did Yoshinobu Yamamoto win the Japan Series champion award?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_987/shard_00003/8179620.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_632/shard_00007/5243481.png.tiles/chunk_0000_05.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 49 positive](assets/pos_049.png)

**Top-1 hard negative screenshot**

![Example 49 top hard negative](assets/topneg_049.png)

---

## Example 50

**Query:** When did City Hearts (UK) become financially and legally separate from Hope City Church?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_414/shard_00009/3431195.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_219/shard_00011/1817628.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 50 positive](assets/pos_050.png)

**Top-1 hard negative screenshot**

![Example 50 top hard negative](assets/topneg_050.png)

---

## Example 51

**Query:** What is the ZIP code for the census-designated place of Talmage?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_870/shard_00006/7213422.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_870/shard_00006/7213403.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 51 positive](assets/pos_051.png)

**Top-1 hard negative screenshot**

![Example 51 top hard negative](assets/topneg_051.png)

---

## Example 52

**Query:** What is the estimated number of speakers for Western Egyptian Bedawi Arabic as of 2022?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_965/shard_00006/8000832.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_068/shard_00000/563342.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 52 positive](assets/pos_052.png)

**Top-1 hard negative screenshot**

![Example 52 top hard negative](assets/topneg_052.png)

---

## Example 53

**Query:** On what date did the Schoharie Creek Bridge collapse?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_805/shard_00004/6673489.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_805/shard_00004/6673489.png.tiles/chunk_0000_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 53 positive](assets/pos_053.png)

**Top-1 hard negative screenshot**

![Example 53 top hard negative](assets/topneg_053.png)

---

## Example 54

**Query:** Which architectural firm designed the Valimo station?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_939/shard_00008/7786764.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_940/shard_00002/7789013.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 54 positive](assets/pos_054.png)

**Top-1 hard negative screenshot**

![Example 54 top hard negative](assets/topneg_054.png)

---

## Example 55

**Query:** In which town is Du Mâle Lake located?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_282/shard_00012/2341580.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_517/shard_00006/4288832.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 55 positive](assets/pos_055.png)

**Top-1 hard negative screenshot**

![Example 55 top hard negative](assets/topneg_055.png)

---

## Example 56

**Query:** Who was the Flemish contemporary art historian and artist that serves as the principal source on the life of Joos van Winghe?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_473/shard_00009/3921275.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_446/shard_00009/3696225.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 56 positive](assets/pos_056.png)

**Top-1 hard negative screenshot**

![Example 56 top hard negative](assets/topneg_056.png)

---

## Example 57

**Query:** Who nominated Arifin Zakaria for the position of 7th Chief Justice of Malaysia?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_115/shard_00004/956877.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_990/shard_00007/8209043.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 57 positive](assets/pos_057.png)

**Top-1 hard negative screenshot**

![Example 57 top hard negative](assets/topneg_057.png)

---

## Example 58

**Query:** Which specific medication is listed as a nonsteroidal SARMs in the provided table?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_658/shard_00004/5454939.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_684/shard_00006/5673041.png.tiles/chunk_0001_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 58 positive](assets/pos_058.png)

**Top-1 hard negative screenshot**

![Example 58 top hard negative](assets/topneg_058.png)

---

## Example 59

**Query:** Who wrote the review for the July 19, 2021 episode of WWE Raw?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_461/shard_00007/3825947.png.tiles/chunk_0001_07.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_956/shard_00005/7924725.png.tiles/chunk_0001_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 59 positive](assets/pos_059.png)

**Top-1 hard negative screenshot**

![Example 59 top hard negative](assets/topneg_059.png)

---

## Example 60

**Query:** Who were the French Open women's doubles champions in 1929?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_018/shard_00005/154279.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_023/shard_00013/198282.png.tiles/chunk_0000_05.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 60 positive](assets/pos_060.png)

**Top-1 hard negative screenshot**

![Example 60 top hard negative](assets/topneg_060.png)

---

## Example 61

**Query:** Which character did the actress play in the 2013 film Horns?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_492/shard_00002/4078151.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_439/shard_00003/3639687.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 61 positive](assets/pos_061.png)

**Top-1 hard negative screenshot**

![Example 61 top hard negative](assets/topneg_061.png)

---

## Example 62

**Query:** Who is considered the father of City Park in Denver?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_219/shard_00011/1817879.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_791/shard_00003/6556411.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 62 positive](assets/pos_062.png)

**Top-1 hard negative screenshot**

![Example 62 top hard negative](assets/topneg_062.png)

---

## Example 63

**Query:** Who was the recipient of the award for the 1933 season in the provided table?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_846/shard_00003/7011854.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_011/shard_00000/91871.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 63 positive](assets/pos_063.png)

**Top-1 hard negative screenshot**

![Example 63 top hard negative](assets/topneg_063.png)

---

## Example 64

**Query:** Who is the Métis artist that initiated the Walking With Our Sisters project?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_958/shard_00000/7936833.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_619/shard_00007/5134863.png.tiles/chunk_0002_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 64 positive](assets/pos_064.png)

**Top-1 hard negative screenshot**

![Example 64 top hard negative](assets/topneg_064.png)

---

## Example 65

**Query:** Which book did Mildred Valley Thornton publish in 1966?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_614/shard_00006/5092743.png.tiles/chunk_0000_02.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_154/shard_00010/1279928.png.tiles/chunk_0000_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 65 positive](assets/pos_065.png)

**Top-1 hard negative screenshot**

![Example 65 top hard negative](assets/topneg_065.png)

---

## Example 66

**Query:** Which country does the judoka Stéphane Traineau represent in the 95 kg category?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_023/shard_00013/198101.png.tiles/chunk_0000_04.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_024/shard_00008/206845.png.tiles/chunk_0000_04.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 66 positive](assets/pos_066.png)

**Top-1 hard negative screenshot**

![Example 66 top hard negative](assets/topneg_066.png)

---

## Example 67

**Query:** Which former Cleveland Indians player did the Seattle Mariners sign on December 20?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_018/shard_00006/155375.png.tiles/chunk_0002_07.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_036/shard_00004/302496.png.tiles/chunk_0000_03.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 67 positive](assets/pos_067.png)

**Top-1 hard negative screenshot**

![Example 67 top hard negative](assets/topneg_067.png)

---

## Example 68

**Query:** Who wrote the episode "I, Monster" of the Teenage Mutant Ninja Turtles series?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_875/shard_00003/7252499.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_543/shard_00000/4498284.png.tiles/chunk_0000_07.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 68 positive](assets/pos_068.png)

**Top-1 hard negative screenshot**

![Example 68 top hard negative](assets/topneg_068.png)

---

## Example 69

**Query:** Who was Kesha Rogers' opponent in the general election for the U.S. House of Representatives?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_497/shard_00001/4118840.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_497/shard_00006/4123984.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 69 positive](assets/pos_069.png)

**Top-1 hard negative screenshot**

![Example 69 top hard negative](assets/topneg_069.png)

---

## Example 70

**Query:** Which club did Moreno Torricelli join in January 2003?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_627/shard_00000/5194105.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_301/shard_00004/2499189.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 70 positive](assets/pos_070.png)

**Top-1 hard negative screenshot**

![Example 70 top hard negative](assets/topneg_070.png)

---

## Example 71

**Query:** Who was the president of Whitefield F.C.?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_968/shard_00001/8020372.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_172/shard_00001/1426813.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 71 positive](assets/pos_071.png)

**Top-1 hard negative screenshot**

![Example 71 top hard negative](assets/topneg_071.png)

---

## Example 72

**Query:** At which venue did the original Broadway production of Three Men on a Horse premiere?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_903/shard_00006/7487412.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_529/shard_00006/4389184.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 72 positive](assets/pos_072.png)

**Top-1 hard negative screenshot**

![Example 72 top hard negative](assets/topneg_072.png)

---

## Example 73

**Query:** What virus strain was responsible for the 1972 Yugoslav smallpox outbreak?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_017/shard_00003/144785.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_017/shard_00003/144785.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 73 positive](assets/pos_073.png)

**Top-1 hard negative screenshot**

![Example 73 top hard negative](assets/topneg_073.png)

---

## Example 74

**Query:** Which band is listed as a spinoff of the Australian band XL Capris?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_981/shard_00004/8130632.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_501/shard_00002/4152976.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 74 positive](assets/pos_074.png)

**Top-1 hard negative screenshot**

![Example 74 top hard negative](assets/topneg_074.png)

---

## Example 75

**Query:** Which South Vietnamese official served as the 8th Prime Minister of South Vietnam from 1969 to 1975?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_524/shard_00000/4343479.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_420/shard_00002/3482655.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 75 positive](assets/pos_075.png)

**Top-1 hard negative screenshot**

![Example 75 top hard negative](assets/topneg_075.png)

---

## Example 76

**Query:** What hyperparasitic fungus is known to parasitize Puccinia striiformis f. sp. tritici?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_107/shard_00012/892492.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_966/shard_00007/8010103.png.tiles/chunk_0000_04.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 76 positive](assets/pos_076.png)

**Top-1 hard negative screenshot**

![Example 76 top hard negative](assets/topneg_076.png)

---

## Example 77

**Query:** What is the local name for the circular road in Thrissur that surrounds the Thekkinkadu Maidan?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_862/shard_00005/7146191.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_683/shard_00005/5663293.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 77 positive](assets/pos_077.png)

**Top-1 hard negative screenshot**

![Example 77 top hard negative](assets/topneg_077.png)

---

## Example 78

**Query:** Which cyclist representing France placed second in the Tempo race?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_050/shard_00007/421396.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_044/shard_00003/368054.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 78 positive](assets/pos_078.png)

**Top-1 hard negative screenshot**

![Example 78 top hard negative](assets/topneg_078.png)

---

## Example 79

**Query:** On what date did the 2024 delivery robbery occur in Vila Império?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_946/shard_00007/7843984.png.tiles/chunk_0000_04.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_907/shard_00002/7516192.png.tiles/chunk_0002_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 79 positive](assets/pos_079.png)

**Top-1 hard negative screenshot**

![Example 79 top hard negative](assets/topneg_079.png)

---

## Example 80

**Query:** Who was the Spanish shipbuilder who further developed the galleass for usage in the Atlantic?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_348/shard_00006/2889049.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_750/shard_00001/6214283.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 80 positive](assets/pos_080.png)

**Top-1 hard negative screenshot**

![Example 80 top hard negative](assets/topneg_080.png)

---

## Example 81

**Query:** Who produced the Steely Dan song "Time Out of Mind"?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_906/shard_00002/7508052.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_906/shard_00002/7508049.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 81 positive](assets/pos_081.png)

**Top-1 hard negative screenshot**

![Example 81 top hard negative](assets/topneg_081.png)

---

## Example 82

**Query:** Where was the Super heavyweight competition at the 2021 AIBA World Boxing Championships held?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_047/shard_00002/391988.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_047/shard_00002/391985.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 82 positive](assets/pos_082.png)

**Top-1 hard negative screenshot**

![Example 82 top hard negative](assets/topneg_082.png)

---

## Example 83

**Query:** What is the type of technology used in AMD PowerPlay?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_064/shard_00010/533731.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_588/shard_00008/4879200.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 83 positive](assets/pos_083.png)

**Top-1 hard negative screenshot**

![Example 83 top hard negative](assets/topneg_083.png)

---

## Example 84

**Query:** In what year was John D. Altenburg Jr. born?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_466/shard_00003/3863881.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_428/shard_00000/3546228.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 84 positive](assets/pos_084.png)

**Top-1 hard negative screenshot**

![Example 84 top hard negative](assets/topneg_084.png)

---

## Example 85

**Query:** Which military unit is the current garrison at Irwin Barracks?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_438/shard_00005/3635386.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_760/shard_00001/6297588.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 85 positive](assets/pos_085.png)

**Top-1 hard negative screenshot**

![Example 85 top hard negative](assets/topneg_085.png)

---

## Example 86

**Query:** Who was the Russian peacekeeping commander in Abkhazia who declared that Georgian military forces in the Zugdidi district must lay down their arms?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_143/shard_00001/1186061.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_735/shard_00001/6089921.png.tiles/chunk_0002_07.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 86 positive](assets/pos_086.png)

**Top-1 hard negative screenshot**

![Example 86 top hard negative](assets/topneg_086.png)

---

## Example 87

**Query:** Who are listed as the writers for Hauntology in the infobox?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_393/shard_00003/3259166.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_393/shard_00003/3259166.png.tiles/chunk_0000_00.png`  

**Review note:** Borderline query during manual review because nearby chunks were semantically very close, but not confirmed as a false negative.  

**Positive screenshot**

![Example 87 positive](assets/pos_087.png)

**Top-1 hard negative screenshot**

![Example 87 top hard negative](assets/topneg_087.png)

---

## Example 88

**Query:** Who is the current chairman of the football club FC Alay?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_317/shard_00011/2633190.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_836/shard_00001/6927205.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 88 positive](assets/pos_088.png)

**Top-1 hard negative screenshot**

![Example 88 top hard negative](assets/topneg_088.png)

---

## Example 89

**Query:** On what date did the Joint Typhoon Warning Center initiate advisories on Tropical Depression 28W?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_925/shard_00001/7664584.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_925/shard_00002/7665125.png.tiles/chunk_0001_06.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 89 positive](assets/pos_089.png)

**Top-1 hard negative screenshot**

![Example 89 top hard negative](assets/topneg_089.png)

---

## Example 90

**Query:** Who succeeded Mukhtar Abbas Naqvi as the Minister of Minority Affairs?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_632/shard_00002/5237517.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_503/shard_00001/4168439.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 90 positive](assets/pos_090.png)

**Top-1 hard negative screenshot**

![Example 90 top hard negative](assets/topneg_090.png)

---

## Example 91

**Query:** In what year was the Enoggera Remount Depot built?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_761/shard_00006/6310956.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_304/shard_00010/2521794.png.tiles/chunk_0000_02.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 91 positive](assets/pos_091.png)

**Top-1 hard negative screenshot**

![Example 91 top hard negative](assets/topneg_091.png)

---

## Example 92

**Query:** Who served as the President of Rangers F.C. during the 1898–99 season?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_007/shard_00005/63243.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_007/shard_00009/60210.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 92 positive](assets/pos_092.png)

**Top-1 hard negative screenshot**

![Example 92 top hard negative](assets/topneg_092.png)

---

## Example 93

**Query:** Which cover album by Easy Star All-Stars features a cover of the Radiohead song "Let Down"?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_529/shard_00006/4388923.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_529/shard_00006/4389079.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 93 positive](assets/pos_093.png)

**Top-1 hard negative screenshot**

![Example 93 top hard negative](assets/topneg_093.png)

---

## Example 94

**Query:** On what date was the SMN founded?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_651/shard_00001/5394076.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_400/shard_00001/3314778.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 94 positive](assets/pos_094.png)

**Top-1 hard negative screenshot**

![Example 94 top hard negative](assets/topneg_094.png)

---

## Example 95

**Query:** Which song was featured in the initial television ad campaign for the Subaru Tribeca in the United States?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_856/shard_00004/7095377.png.tiles/chunk_0000_03.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_578/shard_00008/4796346.png.tiles/chunk_0001_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 95 positive](assets/pos_095.png)

**Top-1 hard negative screenshot**

![Example 95 top hard negative](assets/topneg_095.png)

---

## Example 96

**Query:** Who served as the director of the Wheelhouse Maritime Museum?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_967/shard_00000/8011052.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_645/shard_00003/5346675.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 96 positive](assets/pos_096.png)

**Top-1 hard negative screenshot**

![Example 96 top hard negative](assets/topneg_096.png)

---

## Example 97

**Query:** Who was the spouse of John Houston?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_467/shard_00012/3876725.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_467/shard_00012/3876727.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 97 positive](assets/pos_097.png)

**Top-1 hard negative screenshot**

![Example 97 top hard negative](assets/topneg_097.png)

---

## Example 98

**Query:** For which film did Lizzy Gardiner and Tim Chappel design the dress made of 254 expired American Express gold cards?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_558/shard_00000/4625933.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_159/shard_00001/1318767.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 98 positive](assets/pos_098.png)

**Top-1 hard negative screenshot**

![Example 98 top hard negative](assets/topneg_098.png)

---

## Example 99

**Query:** In what Puerto Rican municipality is the Piedra del Indio located?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_304/shard_00005/2523971.png.tiles/chunk_0000_01.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_710/shard_00008/5889687.png.tiles/chunk_0000_00.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 99 positive](assets/pos_099.png)

**Top-1 hard negative screenshot**

![Example 99 top hard negative](assets/topneg_099.png)

---

## Example 100

**Query:** What is the elevation of Panjgur?  

**Positive chunk:** `/opt/dlami/nvme/kiwix_tiles/shard_690/shard_00002/5718612.png.tiles/chunk_0000_00.png`  

**Top-1 hard negative:** `/opt/dlami/nvme/kiwix_tiles/shard_689/shard_00009/5713870.png.tiles/chunk_0000_01.png`  

**Review note:** No clear false negative identified during the manual review.  

**Positive screenshot**

![Example 100 positive](assets/pos_100.png)

**Top-1 hard negative screenshot**

![Example 100 top hard negative](assets/topneg_100.png)

---
