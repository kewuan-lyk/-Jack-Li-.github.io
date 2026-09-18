/* ==========================================================================
   Pokémon Master - Main Application Logic (app.js)
   Includes 8-Floor Lodge, Quiz Image Opacity Bugfix, & Full Battle System
   ========================================================================== */

// 1. 初代 151 宝可梦完整数据库与 8 大主题楼层归属
const POKEMON_DB = [
  { id: 1, name: "妙蛙种子", enName: "Bulbasaur", types: ["grass", "poison"], floor: 1, moveEn: "Vine Whip", moveZh: "藤鞭" },
  { id: 2, name: "妙蛙草", enName: "Ivysaur", types: ["grass", "poison"], floor: 2, moveEn: "Razor Leaf", moveZh: "飞叶快刀" },
  { id: 3, name: "妙蛙花", enName: "Venusaur", types: ["grass", "poison"], floor: 2, moveEn: "Solar Beam", moveZh: "日光束" },
  { id: 4, name: "小火龙", enName: "Charmander", types: ["fire"], floor: 1, moveEn: "Ember", moveZh: "火花" },
  { id: 5, name: "火恐龙", enName: "Charmeleon", types: ["fire"], floor: 4, moveEn: "Flamethrower", moveZh: "喷射火焰" },
  { id: 6, name: "喷火龙", enName: "Charizard", types: ["fire", "flying"], floor: 4, moveEn: "Fire Blast", moveZh: "大字爆炎" },
  { id: 7, name: "杰尼龟", enName: "Squirtle", types: ["water"], floor: 1, moveEn: "Water Gun", moveZh: "水枪" },
  { id: 8, name: "卡咪龟", enName: "Wartortle", types: ["water"], floor: 3, moveEn: "Bubble Beam", moveZh: "泡沫光线" },
  { id: 9, name: "水箭龟", enName: "Blastoise", types: ["water"], floor: 3, moveEn: "Hydro Pump", moveZh: "水炮" },
  { id: 10, name: "绿毛虫", enName: "Caterpie", types: ["bug"], floor: 2, moveEn: "Tackle", moveZh: "撞击" },
  { id: 11, name: "铁甲蛹", enName: "Metapod", types: ["bug"], floor: 2, moveEn: "Harden", moveZh: "变硬" },
  { id: 12, name: "巴大蝶", enName: "Butterfree", types: ["bug", "flying"], floor: 2, moveEn: "Confusion", moveZh: "念力" },
  { id: 13, name: "独角虫", enName: "Weedle", types: ["bug", "poison"], floor: 2, moveEn: "Poison Sting", moveZh: "毒针" },
  { id: 14, name: "铁壳蛹", enName: "Kakuna", types: ["bug", "poison"], floor: 2, moveEn: "Harden", moveZh: "变硬" },
  { id: 15, name: "大针蜂", enName: "Beedrill", types: ["bug", "poison"], floor: 2, moveEn: "Twineedle", moveZh: "双针" },
  { id: 16, name: "波波", enName: "Pidgey", types: ["normal", "flying"], floor: 1, moveEn: "Gust", moveZh: "起风" },
  { id: 17, name: "比比鸟", enName: "Pidgeotto", types: ["normal", "flying"], floor: 1, moveEn: "Wing Attack", moveZh: "翅膀攻击" },
  { id: 18, name: "大比鸟", enName: "Pidgeot", types: ["normal", "flying"], floor: 1, moveEn: "Hurricane", moveZh: "暴风" },
  { id: 19, name: "小拉达", enName: "Rattata", types: ["normal"], floor: 1, moveEn: "Quick Attack", moveZh: "电光一闪" },
  { id: 20, name: "拉达", enName: "Raticate", types: ["normal"], floor: 1, moveEn: "Hyper Fang", moveZh: "必杀门牙" },
  { id: 21, name: "烈雀", enName: "Spearow", types: ["normal", "flying"], floor: 1, moveEn: "Peck", moveZh: "啄" },
  { id: 22, name: "大嘴雀", enName: "Fearow", types: ["normal", "flying"], floor: 1, moveEn: "Drill Peck", moveZh: "直冲钻" },
  { id: 23, name: "阿柏蛇", enName: "Ekans", types: ["poison"], floor: 6, moveEn: "Bite", moveZh: "咬住" },
  { id: 24, name: "阿柏怪", enName: "Arbok", types: ["poison"], floor: 6, moveEn: "Acid", moveZh: "溶解液" },
  { id: 25, name: "皮卡丘", enName: "Pikachu", types: ["electric"], floor: 1, moveEn: "Thunderbolt", moveZh: "十万伏特" },
  { id: 26, name: "雷丘", enName: "Raichu", types: ["electric"], floor: 4, moveEn: "Thunder", moveZh: "打雷" },
  { id: 27, name: "穿山鼠", enName: "Sandshrew", types: ["ground"], floor: 6, moveEn: "Scratch", moveZh: "抓" },
  { id: 28, name: "穿山王", enName: "Sandslash", types: ["ground"], floor: 6, moveEn: "Slash", moveZh: "劈开" },
  { id: 29, name: "尼多兰", enName: "Nidoran♀", types: ["poison"], floor: 6, moveEn: "Double Kick", moveZh: "二连踢" },
  { id: 30, name: "尼多娜", enName: "Nidorina", types: ["poison"], floor: 6, moveEn: "Poison Fang", moveZh: "剧毒牙" },
  { id: 31, name: "尼多后", enName: "Nidoqueen", types: ["poison", "ground"], floor: 6, moveEn: "Earth Power", moveZh: "大地之力" },
  { id: 32, name: "尼多朗", enName: "Nidoran♂", types: ["poison"], floor: 6, moveEn: "Horn Attack", moveZh: "角撞" },
  { id: 33, name: "尼多力诺", enName: "Nidorino", types: ["poison"], floor: 6, moveEn: "Fury Attack", moveZh: "乱突" },
  { id: 34, name: "尼多王", enName: "Nidoking", types: ["poison", "ground"], floor: 6, moveEn: "Megahorn", moveZh: "超级角击" },
  { id: 35, name: "皮皮", enName: "Clefairy", types: ["fairy"], floor: 1, moveEn: "Metronome", moveZh: "挥指" },
  { id: 36, name: "皮可西", enName: "Clefable", types: ["fairy"], floor: 1, moveEn: "Moonblast", moveZh: "月亮之力" },
  { id: 37, name: "六尾", enName: "Vulpix", types: ["fire"], floor: 4, moveEn: "Will-O-Wisp", moveZh: "鬼火" },
  { id: 38, name: "九尾", enName: "Ninetales", types: ["fire"], floor: 4, moveEn: "Fire Spin", moveZh: "火焰旋涡" },
  { id: 39, name: "胖丁", enName: "Jigglypuff", types: ["normal", "fairy"], floor: 1, moveEn: "Sing", moveZh: "唱歌" },
  { id: 40, name: "胖可丁", enName: "Wigglytuff", types: ["normal", "fairy"], floor: 1, moveEn: "Hyper Voice", moveZh: "巨声" },
  { id: 41, name: "超音蝠", enName: "Zubat", types: ["poison", "flying"], floor: 6, moveEn: "Supersonic", moveZh: "超音波" },
  { id: 42, name: "大嘴蝠", enName: "Golbat", types: ["poison", "flying"], floor: 6, moveEn: "Confuse Ray", moveZh: "奇异光线" },
  { id: 43, name: "走路草", enName: "Oddish", types: ["grass", "poison"], floor: 2, moveEn: "Absorb", moveZh: "吸取" },
  { id: 44, name: "臭臭花", enName: "Gloom", types: ["grass", "poison"], floor: 2, moveEn: "Mega Drain", moveZh: "超级吸取" },
  { id: 45, name: "霸王花", enName: "Vileplume", types: ["grass", "poison"], floor: 2, moveEn: "Petal Dance", moveZh: "花瓣舞" },
  { id: 46, name: "派拉斯", enName: "Paras", types: ["bug", "grass"], floor: 2, moveEn: "Spore", moveZh: "蘑菇孢子" },
  { id: 47, name: "派拉斯特", enName: "Parasect", types: ["bug", "grass"], floor: 2, moveEn: "X-Scissor", moveZh: "十字剪" },
  { id: 48, name: "毛球", enName: "Venonat", types: ["bug", "poison"], floor: 2, moveEn: "Psybeam", moveZh: "幻象光线" },
  { id: 49, name: "摩鲁蛾", enName: "Venomoth", types: ["bug", "poison"], floor: 2, moveEn: "Bug Buzz", moveZh: "虫鸣" },
  { id: 50, name: "地鼠", enName: "Diglett", types: ["ground"], floor: 6, moveEn: "Dig", moveZh: "挖洞" },
  { id: 51, name: "三地鼠", enName: "Dugtrio", types: ["ground"], floor: 6, moveEn: "Earthquake", moveZh: "地震" },
  { id: 52, name: "喵喵", enName: "Meowth", types: ["normal"], floor: 1, moveEn: "Pay Day", moveZh: "聚宝功" },
  { id: 53, name: "猫老大", enName: "Persian", types: ["normal"], floor: 1, moveEn: "Power Gem", moveZh: "力量宝石" },
  { id: 54, name: "可达鸭", enName: "Psyduck", types: ["water"], floor: 3, moveEn: "Water Pulse", moveZh: "水之波动" },
  { id: 55, name: "哥达鸭", enName: "Golduck", types: ["water"], floor: 3, moveEn: "Amnesia", moveZh: "瞬间失忆" },
  { id: 56, name: "猴怪", enName: "Mankey", types: ["fighting"], floor: 5, moveEn: "Karate Chop", moveZh: "空手劈" },
  { id: 57, name: "火爆猴", enName: "Primeape", types: ["fighting"], floor: 5, moveEn: "Cross Chop", moveZh: "十字劈" },
  { id: 58, name: "卡蒂狗", enName: "Growlithe", types: ["fire"], floor: 4, moveEn: "Flame Wheel", moveZh: "火焰轮" },
  { id: 59, name: "风速狗", enName: "Arcanine", types: ["fire"], floor: 4, moveEn: "Extreme Speed", moveZh: "神速" },
  { id: 60, name: "蚊香蝌蚪", enName: "Poliwag", types: ["water"], floor: 3, moveEn: "Hypnosis", moveZh: "催眠术" },
  { id: 61, name: "蚊香君", enName: "Poliwhirl", types: ["water"], floor: 3, moveEn: "Body Slam", moveZh: "泰山压顶" },
  { id: 62, name: "蚊香泳士", enName: "Poliwrath", types: ["water", "fighting"], floor: 3, moveEn: "Submission", moveZh: "地狱翻滚" },
  { id: 63, name: "凯西", enName: "Abra", types: ["psychic"], floor: 7, moveEn: "Teleport", moveZh: "瞬间移动" },
  { id: 64, name: "勇基拉", enName: "Kadabra", types: ["psychic"], floor: 7, moveEn: "Psybeam", moveZh: "幻象光线" },
  { id: 65, name: "胡地", enName: "Alakazam", types: ["psychic"], floor: 7, moveEn: "Psychic", moveZh: "精神强念" },
  { id: 66, name: "腕力", enName: "Machop", types: ["fighting"], floor: 5, moveEn: "Low Kick", moveZh: "踢倒" },
  { id: 67, name: "豪力", enName: "Machoke", types: ["fighting"], floor: 5, moveEn: "Vital Throw", moveZh: "借力摔" },
  { id: 68, name: "怪力", enName: "Machamp", types: ["fighting"], floor: 5, moveEn: "Dynamic Punch", moveZh: "爆裂拳" },
  { id: 69, name: "喇叭芽", enName: "Bellsprout", types: ["grass", "poison"], floor: 2, moveEn: "Vine Whip", moveZh: "藤鞭" },
  { id: 70, name: "口呆花", enName: "Weepinbell", types: ["grass", "poison"], floor: 2, moveEn: "Acid", moveZh: "溶解液" },
  { id: 71, name: "大食花", enName: "Victreebel", types: ["grass", "poison"], floor: 2, moveEn: "Leaf Storm", moveZh: "飞叶风暴" },
  { id: 72, name: "玛瑙水母", enName: "Tentacool", types: ["water", "poison"], floor: 3, moveEn: "Bubble", moveZh: "泡沫" },
  { id: 73, name: "毒刺水母", enName: "Tentacruel", types: ["water", "poison"], floor: 3, moveEn: "Sludge Wave", moveZh: "污泥波" },
  { id: 74, name: "小拳石", enName: "Geodude", types: ["rock", "ground"], floor: 5, moveEn: "Rock Throw", moveZh: "落石" },
  { id: 75, name: "隆隆石", enName: "Graveler", types: ["rock", "ground"], floor: 5, moveEn: "Rollout", moveZh: "滚动" },
  { id: 76, name: "隆隆岩", enName: "Golem", types: ["rock", "ground"], floor: 5, moveEn: "Explosion", moveZh: "大爆炸" },
  { id: 77, name: "小火马", enName: "Ponyta", types: ["fire"], floor: 4, moveEn: "Flame Charge", moveZh: "蓄能焰袭" },
  { id: 78, name: "烈焰马", enName: "Rapidash", types: ["fire"], floor: 4, moveEn: "Flare Blitz", moveZh: "闪焰冲锋" },
  { id: 79, name: "呆呆兽", enName: "Slowpoke", types: ["water", "psychic"], floor: 3, moveEn: "Yawn", moveZh: "哈欠" },
  { id: 80, name: "呆壳兽", enName: "Slowbro", types: ["water", "psychic"], floor: 3, moveEn: "Scald", moveZh: "热水" },
  { id: 81, name: "小磁怪", enName: "Magnemite", types: ["electric", "steel"], floor: 4, moveEn: "Spark", moveZh: "电光" },
  { id: 82, name: "三合一磁怪", enName: "Magneton", types: ["electric", "steel"], floor: 4, moveEn: "Zap Cannon", moveZh: "电磁炮" },
  { id: 83, name: "大葱鸭", enName: "Farfetch'd", types: ["normal", "flying"], floor: 1, moveEn: "Slash", moveZh: "劈开" },
  { id: 84, name: "嘟嘟", enName: "Doduo", types: ["normal", "flying"], floor: 1, moveEn: "Peck", moveZh: "啄" },
  { id: 85, name: "嘟嘟利", enName: "Dodrio", types: ["normal", "flying"], floor: 1, moveEn: "Tri Attack", moveZh: "三重攻击" },
  { id: 86, name: "小海狮", enName: "Seel", types: ["water"], floor: 3, moveEn: "Aurora Beam", moveZh: "极光束" },
  { id: 87, name: "白海狮", enName: "Dewgong", types: ["water", "ice"], floor: 3, moveEn: "Ice Beam", moveZh: "冰冻光束" },
  { id: 88, name: "臭泥", enName: "Grimer", types: ["poison"], floor: 6, moveEn: "Sludge", moveZh: "污泥" },
  { id: 89, name: "臭臭泥", enName: "Muk", types: ["poison"], floor: 6, moveEn: "Gunk Shot", moveZh: "垃圾射击" },
  { id: 90, name: "大舌贝", enName: "Shellder", types: ["water"], floor: 3, moveEn: "Clamp", moveZh: "夹住" },
  { id: 91, name: "刺甲贝", enName: "Cloyster", types: ["water", "ice"], floor: 3, moveEn: "Icicle Spear", moveZh: "冰锥" },
  { id: 92, name: "鬼斯", enName: "Gastly", types: ["ghost", "poison"], floor: 7, moveEn: "Lick", moveZh: "舌舔" },
  { id: 93, name: "鬼斯通", enName: "Haunter", types: ["ghost", "poison"], floor: 7, moveEn: "Shadow Ball", moveZh: "阴影球" },
  { id: 94, name: "耿鬼", enName: "Gengar", types: ["ghost", "poison"], floor: 7, moveEn: "Shadow Punch", moveZh: "暗影拳" },
  { id: 95, name: "大岩蛇", enName: "Onix", types: ["rock", "ground"], floor: 5, moveEn: "Rock Tomb", moveZh: "岩石封锁" },
  { id: 96, name: "催眠貘", enName: "Drowzee", types: ["psychic"], floor: 7, moveEn: "Hypnosis", moveZh: "催眠术" },
  { id: 97, name: "引梦貘人", enName: "Hypno", types: ["psychic"], floor: 7, moveEn: "Dream Eater", moveZh: "食梦" },
  { id: 98, name: "大钳蟹", enName: "Krabby", types: ["water"], floor: 3, moveEn: "Vise Grip", moveZh: "夹住" },
  { id: 99, name: "巨钳蟹", enName: "Kingler", types: ["water"], floor: 3, moveEn: "Crabhammer", moveZh: "蟹钳锤" },
  { id: 100, name: "霹雳电球", enName: "Voltorb", types: ["electric"], floor: 4, moveEn: "Charge Beam", moveZh: "充电光束" },
  { id: 101, name: "顽皮雷弹", enName: "Electrode", types: ["electric"], floor: 4, moveEn: "Self-Destruct", moveZh: "自爆" },
  { id: 102, name: "蛋蛋", enName: "Exeggcute", types: ["grass", "psychic"], floor: 2, moveEn: "Barrage", moveZh: "炸弹" },
  { id: 103, name: "椰蛋树", enName: "Exeggutor", types: ["grass", "psychic"], floor: 2, moveEn: "Wood Hammer", moveZh: "木槌" },
  { id: 104, name: "卡拉卡拉", enName: "Cubone", types: ["ground"], floor: 5, moveEn: "Bone Club", moveZh: "骨头棒" },
  { id: 105, name: "嘎啦嘎啦", enName: "Marowak", types: ["ground"], floor: 5, moveEn: "Bonemerang", moveZh: "骨头回力标" },
  { id: 106, name: "飞腿郎", enName: "Hitmonlee", types: ["fighting"], floor: 5, moveEn: "High Jump Kick", moveZh: "飞膝踢" },
  { id: 107, name: "快拳郎", enName: "Hitmonchan", types: ["fighting"], floor: 5, moveEn: "Mach Punch", moveZh: "音速拳" },
  { id: 108, name: "大舌头", enName: "Lickitung", types: ["normal"], floor: 1, moveEn: "Lick", moveZh: "舌舔" },
  { id: 109, name: "瓦斯弹", enName: "Koffing", types: ["poison"], floor: 6, moveEn: "Smog", moveZh: "浊雾" },
  { id: 110, name: "双弹瓦斯", enName: "Weezing", types: ["poison"], floor: 6, moveEn: "Sludge Bomb", moveZh: "污泥炸弹" },
  { id: 111, name: "独角犀牛", enName: "Rhyhorn", types: ["ground", "rock"], floor: 5, moveEn: "Horn Drill", moveZh: "角钻" },
  { id: 112, name: "钻角犀兽", enName: "Rhydon", types: ["ground", "rock"], floor: 5, moveEn: "Hammer Arm", moveZh: "臂锤" },
  { id: 113, name: "吉利蛋", enName: "Chansey", types: ["normal"], floor: 1, moveEn: "Soft-Boiled", moveZh: "生蛋" },
  { id: 114, name: "蔓藤怪", enName: "Tangela", types: ["grass"], floor: 2, moveEn: "Vine Whip", moveZh: "藤鞭" },
  { id: 115, name: "袋兽", enName: "Kangaskhan", types: ["normal"], floor: 5, moveEn: "Dizzy Punch", moveZh: "迷唇拳" },
  { id: 116, name: "墨海马", enName: "Horsea", types: ["water"], floor: 3, moveEn: "Water Gun", moveZh: "水枪" },
  { id: 117, name: "海刺龙", enName: "Seadra", types: ["water"], floor: 3, moveEn: "Dragon Pulse", moveZh: "龙之波动" },
  { id: 118, name: "角金鱼", enName: "Goldeen", types: ["water"], floor: 3, moveEn: "Water Pulse", moveZh: "水之波动" },
  { id: 119, name: "金鱼王", enName: "Seaking", types: ["water"], floor: 3, moveEn: "Waterfall", moveZh: "攀瀑" },
  { id: 120, name: "海星星", enName: "Staryu", types: ["water"], floor: 3, moveEn: "Swift", moveZh: "高速星星" },
  { id: 121, name: "宝石海星", enName: "Starmie", types: ["water", "psychic"], floor: 3, moveEn: "Power Gem", moveZh: "力量宝石" },
  { id: 122, name: "魔墙人偶", enName: "Mr. Mime", types: ["psychic", "fairy"], floor: 7, moveEn: "Light Screen", moveZh: "光墙" },
  { id: 123, name: "飞天螳螂", enName: "Scyther", types: ["bug", "flying"], floor: 2, moveEn: "Air Slash", moveZh: "空气斩" },
  { id: 124, name: "迷唇姐", enName: "Jynx", types: ["ice", "psychic"], floor: 7, moveEn: "Blizzard", moveZh: "暴风雪" },
  { id: 125, name: "电击兽", enName: "Electabuzz", types: ["electric"], floor: 4, moveEn: "Thunder Punch", moveZh: "雷电拳" },
  { id: 126, name: "鸭嘴火兽", enName: "Magmar", types: ["fire"], floor: 4, moveEn: "Fire Punch", moveZh: "火焰拳" },
  { id: 127, name: "凯罗斯", enName: "Pinsir", types: ["bug"], floor: 2, moveEn: "Superpower", moveZh: "蛮力" },
  { id: 128, name: "肯泰罗", enName: "Tauros", types: ["normal"], floor: 5, moveEn: "Take Down", moveZh: "猛撞" },
  { id: 129, name: "鲤鱼王", enName: "Magikarp", types: ["water"], floor: 3, moveEn: "Splash", moveZh: "跃起" },
  { id: 130, name: "暴鲤龙", enName: "Gyarados", types: ["water", "flying"], floor: 8, moveEn: "Hyper Beam", moveZh: "破坏光线" },
  { id: 131, name: "拉普拉斯", enName: "Lapras", types: ["water", "ice"], floor: 8, moveEn: "Surf", moveZh: "冲浪" },
  { id: 132, name: "百变怪", enName: "Ditto", types: ["normal"], floor: 7, moveEn: "Transform", moveZh: "变身" },
  { id: 133, name: "伊布", enName: "Eevee", types: ["normal"], floor: 1, moveEn: "Quick Attack", moveZh: "电光一闪" },
  { id: 134, name: "水伊布", enName: "Vaporeon", types: ["water"], floor: 3, moveEn: "Hydro Pump", moveZh: "水炮" },
  { id: 135, name: "雷伊布", enName: "Jolteon", types: ["electric"], floor: 4, moveEn: "Thunderbolt", moveZh: "十万伏特" },
  { id: 136, name: "火伊布", enName: "Flareon", types: ["fire"], floor: 4, moveEn: "Flamethrower", moveZh: "喷射火焰" },
  { id: 137, name: "多边兽", enName: "Porygon", types: ["normal"], floor: 7, moveEn: "Tri Attack", moveZh: "三重攻击" },
  { id: 138, name: "菊石兽", enName: "Omanyte", types: ["rock", "water"], floor: 3, moveEn: "Ancient Power", moveZh: "原始之力" },
  { id: 139, name: "多刺菊石兽", enName: "Omastar", types: ["rock", "water"], floor: 3, moveEn: "Hydro Pump", moveZh: "水炮" },
  { id: 140, name: "化石盔", enName: "Kabuto", types: ["rock", "water"], floor: 3, moveEn: "Aqua Jet", moveZh: "水流喷射" },
  { id: 141, name: "镰刀盔", enName: "Kabutops", types: ["rock", "water"], floor: 3, moveEn: "Night Slash", moveZh: "暗袭要害" },
  { id: 142, name: "化石翼龙", enName: "Aerodactyl", types: ["rock", "flying"], floor: 5, moveEn: "Rock Slide", moveZh: "岩石崩塌" },
  { id: 143, name: "卡比兽", enName: "Snorlax", types: ["normal"], floor: 1, moveEn: "Body Slam", moveZh: "泰山压顶" },
  { id: 144, name: "急冻鸟", enName: "Articuno", types: ["ice", "flying"], floor: 8, moveEn: "Sheer Cold", moveZh: "绝对零度" },
  { id: 145, name: "闪电鸟", enName: "Zapdos", types: ["electric", "flying"], floor: 8, moveEn: "Thunder", moveZh: "打雷" },
  { id: 146, name: "火焰鸟", enName: "Moltres", types: ["fire", "flying"], floor: 8, moveEn: "Overheat", moveZh: "过热" },
  { id: 147, name: "迷你龙", enName: "Dratini", types: ["dragon"], floor: 8, moveEn: "Dragon Rage", moveZh: "龙之怒" },
  { id: 148, name: "哈克龙", enName: "Dragonair", types: ["dragon"], floor: 8, moveEn: "Dragon Rush", moveZh: "龙之冲锋" },
  { id: 149, name: "快龙", enName: "Dragonite", types: ["dragon", "flying"], floor: 8, moveEn: "Outrage", moveZh: "逆鳞" },
  { id: 150, name: "超梦", enName: "Mewtwo", types: ["psychic"], floor: 8, moveEn: "Psystrike", moveZh: "精神击破" },
  { id: 151, name: "梦幻", enName: "Mew", types: ["psychic"], floor: 8, moveEn: "Psychic", moveZh: "精神强念" }
];

// 2. 多语言字典 (i18n Dictionaries)
const TRANSLATIONS = {
  en: {
    appTitle: "Pokémon Master",
    statPokedex: "Dex:",
    statStreak: "Streak:",
    settingsBtn: "Settings",
    settingsTitle: "⚙️ Control Panel",
    settingLangName: "Display Language",
    settingLangDesc: "Choose English or Simplified Chinese",
    settingThemeName: "Dark Mode",
    settingThemeDesc: "Toggle light & dark visual theme",
    settingResetName: "Reset Collection",
    settingResetDesc: "Clear unlocked Pokémon data & progress",
    resetBtn: "Reset",

    navLodge: "Trainer's Lodge",
    navAdventure: "Adventure Quiz",
    navPokedex: "Pokédex",
    navBattle: "Battle Arena",
    badgeLive: "Active",
    lodgeLobbyText: "Lodge Residents:",

    lodgeTitle: "🏡 Trainer's Lodge",
    lodgeSubtitle: "Your collected Pokémon hang out across 8 categorized building floors! Click them to chat.",
    floorSelector: "Elevator Floor:",
    floor1Name: "1F: Starters & Main Lobby",
    floor2Name: "2F: Forest & Bug Canopy",
    floor3Name: "3F: Ocean & Ice Lagoon",
    floor4Name: "4F: Volcano & Lightning Lab",
    floor5Name: "5F: Mountain & Cave Fortress",
    floor6Name: "6F: Poison & Ground Desert Oasis",
    floor7Name: "7F: Psychic & Ghost Mystic Tower",
    floor8Name: "8F: Mythic & Legendary Sanctuary",
    emptyFloor: "No Pokémon unlocked on this floor yet. Play the Adventure Quiz to unlock!",

    quizTitle: "Who's That Pokémon?",
    gen1Tag: "Gen 1 (Kanto 151)",
    hintsTitle: "💡 Recon Hints",
    skipBtn: "Skip ➔",
    nextBtn: "Next ➔",
    correctTitle: "Correct! It's {name}!",
    correctDesc: "Unlocked and added to your Lodge & Pokédex!",
    wrongTitle: "Incorrect! It's actually {name}!",
    wrongDesc: "Streak reset. Keep trying in the next round!",
    hintTypeLabel: "🏷️ Type:",
    hintIDLabel: "📏 ID:",
    hintPhysLabel: "📏 Body:",
    heightUnit: "m",
    weightUnit: "kg",

    pokedexCompletion: "Pokédex Completion",
    filterStatusAll: "All Pokémon",
    filterStatusCollected: "Collected Only",
    filterStatusLocked: "Locked Silhouettes",
    filterTypeAll: "All Types",

    battleSelectTitle: "⚔️ Choose Your Fighter",
    battleSelectSubtitle: "Select one of your ready Pokémon from your Lodge to enter the arena!",
    btnDefend: "Defend / Guard",
    btnRun: "Retreat",
    btnBackRoster: "Back to Roster",
    faintWarningTitle: "Fainted Penalty Applied!",
    faintWarningDesc: "This Pokémon lost and is fainted for 3 hours. It cannot fight or chat right now.",

    physHeight: "Height",
    physWeight: "Weight",
    statTitle: "Base Stats",
    statAtk: "Attack",
    statDef: "Defense",
    statSpd: "Speed"
  },

  zh: {
    appTitle: "宝可梦大师",
    statPokedex: "图鉴:",
    statStreak: "连胜:",
    settingsBtn: "控制面板",
    settingsTitle: "⚙️ 控制面板与设置",
    settingLangName: "界面显示语言",
    settingLangDesc: "切换英文 (English) 或 简体中文",
    settingThemeName: "深色模式 (Dark Mode)",
    settingThemeDesc: "切换明亮与暗黑夜间主题",
    settingResetName: "重置图鉴进度",
    settingResetDesc: "清空已收集的宝可梦数据并重新开始",
    resetBtn: "重置数据",

    navLodge: "训练师小屋",
    navAdventure: "冒险答题",
    navPokedex: "宝可梦图鉴",
    navBattle: "竞技对战",
    badgeLive: "开放中",
    lodgeLobbyText: "小屋入住数:",

    lodgeTitle: "🏡 训练师小屋",
    lodgeSubtitle: "你收集到的宝可梦会在 8 层主题楼层中愉快游玩！点击宝可梦可互动聊天。",
    floorSelector: "直升电梯:",
    floor1Name: "1F: 初始伙伴与客厅",
    floor2Name: "2F: 森林与虫系树冠",
    floor3Name: "3F: 海洋与冰雪水域",
    floor4Name: "4F: 火山与雷电实验室",
    floor5Name: "5F: 陡峭山脉与岩石格斗堡",
    floor6Name: "6F: 毒系与地面沙漠绿洲",
    floor7Name: "7F: 超能力与幽灵神秘塔",
    floor8Name: "8F: 龙族与神话至尊圣殿",
    emptyFloor: "该楼层暂无已收集的宝可梦。去“冒险答题”中解禁伙伴吧！",

    quizTitle: "猜猜看，这是哪只宝可梦？",
    gen1Tag: "初代 151 篇",
    hintsTitle: "💡 侦查线索",
    skipBtn: "跳过此题 ➔",
    nextBtn: "下一题 ➔",
    correctTitle: "回答正确！这是【{name}】！",
    correctDesc: "已成功解锁并加入你的训练师小屋与图鉴！",
    wrongTitle: "回答错误！正确的宝可梦是【{name}】！",
    wrongDesc: "连胜纪录中断，继续加油！",
    hintTypeLabel: "🏷️ 属性:",
    hintIDLabel: "📏 全国编号:",
    hintPhysLabel: "📏 体型:",
    heightUnit: "米",
    weightUnit: "公斤",

    pokedexCompletion: "图鉴完成度",
    filterStatusAll: "全部宝可梦",
    filterStatusCollected: "已收集",
    filterStatusLocked: "未解锁剪影",
    filterTypeAll: "所有属性",

    battleSelectTitle: "⚔️ 选择出战宝可梦",
    battleSelectSubtitle: "从你训练师小屋的宝可梦中选择一只踏入竞技场（倒计时的晕厥宝可梦不可用）",
    btnDefend: "防御 / 减伤",
    btnRun: "撤退",
    btnBackRoster: "返回阵容",
    faintWarningTitle: "战败惩罚：进入 3 小时晕厥期！",
    faintWarningDesc: "该宝可梦在战斗中被击晕，进入 3 小时恢复倒计时。期间无法聊天互动或再次出战。",

    physHeight: "身高",
    physWeight: "体重",
    statTitle: "基础能力值",
    statAtk: "攻击",
    statDef: "防御",
    statSpd: "速度"
  }
};

// 属性名称中文映射
const TYPE_NAMES = {
  normal: { en: "Normal", zh: "一般" },
  fire: { en: "Fire", zh: "火" },
  water: { en: "Water", zh: "水" },
  grass: { en: "Grass", zh: "草" },
  electric: { en: "Electric", zh: "电" },
  ice: { en: "Ice", zh: "冰" },
  fighting: { en: "Fighting", zh: "格斗" },
  poison: { en: "Poison", zh: "毒" },
  ground: { en: "Ground", zh: "地面" },
  flying: { en: "Flying", zh: "飞行" },
  psychic: { en: "Psychic", zh: "超能力" },
  bug: { en: "Bug", zh: "虫" },
  rock: { en: "Rock", zh: "岩石" },
  ghost: { en: "Ghost", zh: "幽灵" },
  dragon: { en: "Dragon", zh: "龙" },
  steel: { en: "Steel", zh: "钢" },
  fairy: { en: "Fairy", zh: "妖精" }
};

// 属性克制倍率系数 (Type Effectiveness Multipliers)
const TYPE_CHART = {
  water: { fire: 2.0, rock: 2.0, ground: 2.0, grass: 0.5, water: 0.5, dragon: 0.5 },
  fire: { grass: 2.0, ice: 2.0, bug: 2.0, steel: 2.0, water: 0.5, fire: 0.5, rock: 0.5, dragon: 0.5 },
  grass: { water: 2.0, ground: 2.0, rock: 2.0, fire: 0.5, grass: 0.5, poison: 0.5, flying: 0.5, bug: 0.5, dragon: 0.5 },
  electric: { water: 2.0, flying: 2.0, electric: 0.5, grass: 0.5, dragon: 0.5, ground: 0 },
  ice: { grass: 2.0, ground: 2.0, flying: 2.0, dragon: 2.0, fire: 0.5, water: 0.5, ice: 0.5 },
  fighting: { normal: 2.0, ice: 2.0, rock: 2.0, steel: 2.0, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, fairy: 0.5 },
  psychic: { fighting: 2.0, poison: 2.0, psychic: 0.5, steel: 0.5 },
  ghost: { psychic: 2.0, ghost: 2.0, normal: 0 },
  dragon: { dragon: 2.0, steel: 0.5 }
};

// 3. 全局 Pokémon App 主引擎
class PokemonApp {
  constructor() {
    this.totalPokemon = 151;
    this.collectedIds = new Set(this.loadCollectedState());
    this.faintedMap = this.loadFaintedState(); // { pokeId: timestamp }
    this.streak = 0;

    this.currentLang = localStorage.getItem("poke_lang") || "en";
    this.darkMode = localStorage.getItem("poke_theme") === "dark";

    this.currentQuiz = null;
    this.activeBattle = null;
    this.apiCache = new Map();

    this.initElements();
    this.applyTheme();
    this.applyLanguage();
    this.bindEvents();

    this.updateStatsUI();
    this.renderLodgeView();
    this.renderPokedexGrid();
    this.renderBattleRoster();
    this.loadNewQuiz();

    // 每 1 秒轮询更新战败晕厥倒计时
    setInterval(() => this.updateCooldownTimers(), 1000);
  }

  loadCollectedState() {
    try {
      const saved = localStorage.getItem("poke_collected_ids");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved state:", e);
    }
    return [25];
  }

  saveCollectedState() {
    try {
      localStorage.setItem("poke_collected_ids", JSON.stringify(Array.from(this.collectedIds)));
    } catch (e) {
      console.error("Failed to save state:", e);
    }
  }

  // 加载 3 小时晕厥倒计时状态
  loadFaintedState() {
    try {
      const saved = localStorage.getItem("poke_fainted_map");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load fainted map:", e);
    }
    return {};
  }

  saveFaintedState() {
    try {
      localStorage.setItem("poke_fainted_map", JSON.stringify(this.faintedMap));
    } catch (e) {
      console.error("Failed to save fainted map:", e);
    }
  }

  // 检查宝可梦是否处于 3 小时晕厥冷却期
  isFainted(pokeId) {
    const faintedUntil = this.faintedMap[pokeId];
    if (!faintedUntil) return false;
    if (Date.now() >= faintedUntil) {
      delete this.faintedMap[pokeId];
      this.saveFaintedState();
      return false;
    }
    return true;
  }

  // 格式化剩余冷却倒计时时间 (如 02h:45m:12s)
  getRemainingCooldownText(pokeId) {
    const faintedUntil = this.faintedMap[pokeId];
    if (!faintedUntil) return "";
    const diff = Math.max(0, faintedUntil - Date.now());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = n => String(n).padStart(2, '0');
    return `${pad(hours)}h:${pad(mins)}m:${pad(secs)}s`;
  }

  getArtworkUrl(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  initElements() {
    this.settingsToggleBtn = document.getElementById("settings-toggle-btn");
    this.settingsModal = document.getElementById("settings-modal");
    this.settingsCloseBtn = document.getElementById("settings-close-btn");
    this.languageSelect = document.getElementById("language-select");
    this.darkModeToggle = document.getElementById("dark-mode-toggle");
    this.resetBtn = document.getElementById("reset-progress-btn");

    this.navItems = document.querySelectorAll(".nav-item");
    this.viewSections = document.querySelectorAll(".view-section");

    this.collectedCountEl = document.getElementById("collected-count");
    this.totalCountEl = document.getElementById("total-count");
    this.streakCountEl = document.getElementById("streak-count");
    this.lodgeResidentCountEl = document.getElementById("lodge-resident-count");

    // 训练师小屋元素
    this.buildingContainer = document.getElementById("building-container");
    this.floorBtns = document.querySelectorAll(".floor-btn");
    this.dialogPopover = document.getElementById("dialog-popover");
    this.dialogCloseBtn = document.getElementById("dialog-close-btn");
    this.dialogPokeImg = document.getElementById("dialog-poke-img");
    this.dialogPokeName = document.getElementById("dialog-poke-name");
    this.dialogPokeType = document.getElementById("dialog-poke-type");
    this.dialogSpeech = document.getElementById("dialog-speech");

    // 答题元素
    this.quizImg = document.getElementById("quiz-image");
    this.hintsContainer = document.getElementById("hints-container");
    this.optionsContainer = document.getElementById("options-container");
    this.quizFeedback = document.getElementById("quiz-feedback");
    this.feedbackIcon = document.getElementById("feedback-icon");
    this.feedbackTitle = document.getElementById("feedback-title");
    this.feedbackDesc = document.getElementById("feedback-desc");
    this.skipBtn = document.getElementById("skip-btn");
    this.nextBtn = document.getElementById("next-btn");

    // 图鉴元素
    this.pokedexGrid = document.getElementById("pokedex-grid");
    this.searchInput = document.getElementById("pokedex-search");
    this.statusFilter = document.getElementById("status-filter");
    this.typeFilter = document.getElementById("type-filter");
    this.progressFill = document.getElementById("progress-fill");
    this.progressPercentage = document.getElementById("progress-percentage");

    // 战斗系统元素
    this.battleRosterStage = document.getElementById("battle-roster-stage");
    this.battleRosterGrid = document.getElementById("battle-roster-grid");
    this.battleArenaStage = document.getElementById("battle-arena-stage");
    this.arenaEnvironment = document.getElementById("arena-environment");
    this.arenaSceneLabel = document.getElementById("arena-scene-label");
    this.arenaParticles = document.getElementById("arena-particles");
    this.arenaFlash = document.getElementById("arena-flash");
    this.damageLayer = document.getElementById("damage-layer");
    this.oppSprite = document.getElementById("opp-sprite");
    this.oppName = document.getElementById("opp-name");
    this.oppTypeBadge = document.getElementById("opp-type-badge");
    this.oppHpFill = document.getElementById("opp-hp-fill");
    this.oppHpCurr = document.getElementById("opp-hp-curr");
    this.oppHpMax = document.getElementById("opp-hp-max");
    this.playerSprite = document.getElementById("player-sprite");
    this.playerName = document.getElementById("player-name");
    this.playerTypeBadge = document.getElementById("player-type-badge");
    this.playerHpFill = document.getElementById("player-hp-fill");
    this.playerHpCurr = document.getElementById("player-hp-curr");
    this.playerHpMax = document.getElementById("player-hp-max");
    this.battleLogText = document.getElementById("battle-log-text");
    this.btnAttack = document.getElementById("btn-attack");
    this.btnSpecial = document.getElementById("btn-special");
    this.btnDefend = document.getElementById("btn-defend");
    this.btnForfeit = document.getElementById("btn-forfeit");
    this.actionAttackName = document.getElementById("action-attack-name");
    this.actionSpecialName = document.getElementById("action-special-name");
    this.battleResultModal = document.getElementById("battle-result-modal");
    this.resultIcon = document.getElementById("result-icon");
    this.resultTitle = document.getElementById("result-title");
    this.resultDesc = document.getElementById("result-desc");
    this.faintWarningBox = document.getElementById("faint-warning-box");
    this.resultBackBtn = document.getElementById("result-back-btn");
    // Keep the result layer outside the animated view section so fixed centering
    // is always relative to the full viewport.
    document.body.appendChild(this.battleResultModal);

    // 详情 Modal 元素
    this.detailModal = document.getElementById("detail-modal");
    this.modalCloseBtn = document.getElementById("modal-close-btn");
    this.modalId = document.getElementById("modal-id");
    this.modalTitle = document.getElementById("modal-title");
    this.modalEnName = document.getElementById("modal-en-name");
    this.modalImage = document.getElementById("modal-image");
    this.modalTypes = document.getElementById("modal-types");
    this.modalHeight = document.getElementById("modal-height");
    this.modalWeight = document.getElementById("modal-weight");
    this.modalFlavor = document.getElementById("modal-flavor");
    this.statHp = document.getElementById("stat-hp");
    this.statHpNum = document.getElementById("stat-hp-num");
    this.statAtk = document.getElementById("stat-atk");
    this.statAtkNum = document.getElementById("stat-atk-num");
    this.statDef = document.getElementById("stat-def");
    this.statDefNum = document.getElementById("stat-def-num");
    this.statSpd = document.getElementById("stat-spd");
    this.statSpdNum = document.getElementById("stat-spd-num");
  }

  applyTheme() {
    if (this.darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      this.darkModeToggle.checked = true;
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      this.darkModeToggle.checked = false;
    }
  }

  applyLanguage() {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    this.languageSelect.value = this.currentLang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });

    this.renderLodgeView();
    this.renderPokedexGrid();
    this.renderBattleRoster();
    if (this.currentQuiz) {
      this.renderInitialHints(this.currentQuiz.target);
      this.renderOptionButtons(this.currentQuiz.options, this.currentQuiz.target);
    }
  }

  bindEvents() {
    this.settingsToggleBtn.addEventListener("click", () => this.settingsModal.classList.remove("hidden"));
    this.settingsCloseBtn.addEventListener("click", () => this.settingsModal.classList.add("hidden"));
    this.settingsModal.addEventListener("click", (e) => {
      if (e.target === this.settingsModal) this.settingsModal.classList.add("hidden");
    });

    this.languageSelect.addEventListener("change", (e) => {
      this.currentLang = e.target.value;
      localStorage.setItem("poke_lang", this.currentLang);
      this.applyLanguage();
    });

    this.darkModeToggle.addEventListener("change", (e) => {
      this.darkMode = e.target.checked;
      localStorage.setItem("poke_theme", this.darkMode ? "dark" : "light");
      this.applyTheme();
    });

    this.resetBtn.addEventListener("click", () => {
      const msg = this.currentLang === "zh" ? "确定要重置已收集的图鉴与倒计时吗？" : "Are you sure you want to reset all progress?";
      if (confirm(msg)) {
        this.collectedIds = new Set([25]);
        this.faintedMap = {};
        this.streak = 0;
        this.saveCollectedState();
        this.saveFaintedState();
        this.updateStatsUI();
        this.renderLodgeView();
        this.renderPokedexGrid();
        this.renderBattleRoster();
        this.settingsModal.classList.add("hidden");
      }
    });

    this.navItems.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        this.navItems.forEach(b => b.classList.remove("active"));
        this.viewSections.forEach(s => s.classList.remove("active"));

        btn.classList.add("active");
        document.getElementById(targetTab).classList.add("active");

        if (targetTab === "battle-view") {
          this.renderBattleRoster();
        }
      });
    });

    this.floorBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const floorNum = btn.getAttribute("data-floor");
        this.floorBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const floorEl = document.getElementById(`floor-${floorNum}`);
        if (floorEl) {
          floorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    });

    this.skipBtn.addEventListener("click", () => {
      this.streak = 0;
      this.updateStatsUI();
      this.loadNewQuiz();
    });

    this.nextBtn.addEventListener("click", () => this.loadNewQuiz());

    const filterHandler = () => this.filterPokedexGrid();
    this.searchInput.addEventListener("input", filterHandler);
    this.statusFilter.addEventListener("change", filterHandler);
    this.typeFilter.addEventListener("change", filterHandler);

    this.modalCloseBtn.addEventListener("click", () => this.detailModal.classList.add("hidden"));
    this.dialogCloseBtn.addEventListener("click", () => this.dialogPopover.classList.add("hidden"));

    // 战斗点击事件绑定
    this.btnAttack.addEventListener("click", () => this.executeBattleTurn("attack"));
    this.btnSpecial.addEventListener("click", () => this.executeBattleTurn("special"));
    this.btnDefend.addEventListener("click", () => this.executeBattleTurn("defend"));
    this.btnForfeit.addEventListener("click", () => this.endBattle(false, true));
    this.resultBackBtn.addEventListener("click", () => {
      this.battleResultModal.classList.add("hidden");
      this.battleArenaStage.classList.add("hidden");
      this.battleRosterStage.classList.remove("hidden");
      this.renderBattleRoster();
    });
  }

  updateStatsUI() {
    const count = this.collectedIds.size;
    this.collectedCountEl.textContent = count;
    this.totalCountEl.textContent = this.totalPokemon;
    this.streakCountEl.textContent = this.streak;
    this.lodgeResidentCountEl.textContent = count;

    const percentage = Math.round((count / this.totalPokemon) * 100);
    this.progressFill.style.width = `${percentage}%`;
    this.progressPercentage.textContent = `${percentage}%`;
  }

  // 轮询更新小屋与战队的倒计时显示
  updateCooldownTimers() {
    document.querySelectorAll("[data-fainted-id]").forEach(el => {
      const pokeId = parseInt(el.getAttribute("data-fainted-id"));
      if (this.isFainted(pokeId)) {
        const textEl = el.querySelector(".faint-time-str");
        if (textEl) textEl.textContent = this.getRemainingCooldownText(pokeId);
      } else {
        // 时间到了自动刷新
        this.renderLodgeView();
        this.renderBattleRoster();
      }
    });
  }

  /* ------------------------------------------------------------------------
     训练师小屋 (8 层楼层渲染与互动)
     ------------------------------------------------------------------------ */
  renderLodgeView() {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    const floorMap = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] };

    this.collectedIds.forEach(id => {
      const poke = POKEMON_DB.find(p => p.id === id);
      if (poke) {
        const f = poke.floor || 1;
        floorMap[f].push(poke);
      }
    });

    [1, 2, 3, 4, 5, 6, 7, 8].forEach(floorNum => {
      const floorArea = document.getElementById(`floor-${floorNum}-pokemon`);
      if (!floorArea) return;

      floorArea.innerHTML = "";
      const pokes = floorMap[floorNum];

      if (pokes.length === 0) {
        floorArea.innerHTML = `<div class="empty-floor-msg"><span>🛋️</span> ${t.emptyFloor}</div>`;
      } else {
        pokes.forEach(poke => {
          const item = document.createElement("div");
          const isFaint = this.isFainted(poke.id);

          item.className = `roaming-poke-item ${isFaint ? "fainted" : ""}`;
          item.setAttribute("data-fainted-id", poke.id);

          const displayName = this.currentLang === "zh" ? poke.name : poke.enName;

          item.innerHTML = `
            ${isFaint ? `<div class="faint-cooldown-badge">💤 <span class="faint-time-str">${this.getRemainingCooldownText(poke.id)}</span></div>` : ""}
            <img class="roaming-poke-img" src="${this.getArtworkUrl(poke.id)}" alt="${displayName}" title="${displayName}" />
            <span class="roaming-poke-name">${displayName}</span>
          `;

          item.addEventListener("click", () => this.interactWithPokemon(poke));
          floorArea.appendChild(item);
        });
      }
    });
  }

  interactWithPokemon(poke) {
    const isZh = this.currentLang === "zh";
    const name = isZh ? poke.name : poke.enName;
    const move = isZh ? poke.moveZh : poke.moveEn;

    const mainType = poke.types[0];
    const typeLabel = TYPE_NAMES[mainType] ? TYPE_NAMES[mainType][this.currentLang] : mainType;

    let dialogText = "";
    const isFaint = this.isFainted(poke.id);

    if (isFaint) {
      const remainStr = this.getRemainingCooldownText(poke.id);
      dialogText = isZh
        ? `"呼呼……【${name}】在对战中力竭晕厥了，正在休息恢复中。剩余恢复时间: ${remainStr}"`
        : `"Zzz... [${name}] lost in battle and is recovering. Time remaining: ${remainStr}"`;
    } else {
      if (isZh) {
        const quotes = [
          `"你好！在 ${poke.floor}楼 的训练师小屋玩得真开心！想看看我的绝招【${move}】吗？"`,
          `"我是 ${typeLabel} 属性的宝可梦！最喜欢在小屋里和你聊天啦。"`,
          `"今天也是精力充沛的一天！随时准备为你出战！"`,
          `"你收集的图鉴越来越厉害了！下次冒险也带上我吧！"`,
          `"嘘……我刚刚听见楼下有新的训练师来了。要不要一起去看看？"`,
          `"训练的时候记得休息，也要给自己和伙伴一点鼓励哦！"`,
          `"我的绝招【${move}】还在不断变强，等你来挑战！"`,
          `"这里的气氛真棒！和你一起在小屋里生活，我每天都很开心。"`
        ];
        dialogText = quotes[Math.floor(Math.random() * quotes.length)];
      } else {
        const quotes = [
          `"Hello Trainer! Having fun on ${poke.floor}F! Want to see my move [${move}]?"`,
          `"Pika~ I'm a ${typeLabel}-type Pokémon! I love hanging out in the Lodge."`,
          `"Feeling full of energy! Ready to battle whenever you choose me!"`,
          `"Your Pokédex is getting stronger every day. Take me on your next adventure!"`,
          `"Shh... I heard a new Trainer downstairs. Should we go and say hello?"`,
          `"Remember to rest between battles, and cheer for your team!"`,
          `"My move [${move}] is getting stronger. Come back and challenge me again!"`,
          `"The Lodge feels extra cozy today. I am happy to share it with you!"`
        ];
        dialogText = quotes[Math.floor(Math.random() * quotes.length)];
      }
    }

    this.dialogPokeImg.src = this.getArtworkUrl(poke.id);
    this.dialogPokeName.textContent = name;
    this.dialogPokeType.textContent = typeLabel;
    this.dialogSpeech.textContent = dialogText;

    this.dialogPopover.classList.remove("hidden");
  }

  /* ------------------------------------------------------------------------
     答题逻辑 (优化防一帧彩色剪影闪烁 Bug)
     ------------------------------------------------------------------------ */
  async loadNewQuiz() {
    this.quizFeedback.classList.add("hidden");
    this.quizFeedback.classList.remove("incorrect-bg");
    this.nextBtn.classList.add("hidden");
    this.skipBtn.classList.remove("hidden");

    // 核心 Bugfix: 设置透明度为 0 并加上剪影 Class，防止网络加载过程暴露一帧彩色原画
    this.quizImg.style.opacity = "0";
    this.quizImg.className = "silhouette-img silhouette loading";

    const targetIdx = Math.floor(Math.random() * POKEMON_DB.length);
    const target = POKEMON_DB[targetIdx];

    const options = [target];
    while (options.length < 4) {
      const rand = POKEMON_DB[Math.floor(Math.random() * POKEMON_DB.length)];
      if (!options.some(o => o.id === rand.id)) {
        options.push(rand);
      }
    }

    options.sort(() => Math.random() - 0.5);

    this.currentQuiz = { target, options, answered: false };

    const artworkUrl = this.getArtworkUrl(target.id);
    this.quizImg.onload = () => {
      this.quizImg.classList.remove("loading");
      this.quizImg.style.opacity = "1"; // 图片与剪影滤镜加载完成后再恢复可见
    };
    this.quizImg.src = artworkUrl;

    this.renderInitialHints(target);
    this.renderOptionButtons(options, target);
    this.fetchExtraDetails(target.id);
  }

  renderInitialHints(target) {
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    const typesText = target.types
      .map(tp => (TYPE_NAMES[tp] ? TYPE_NAMES[tp][this.currentLang] : tp))
      .join(" / ");

    this.hintsContainer.innerHTML = `
      <div class="hint-item">
        <span class="hint-label">${t.hintTypeLabel}</span>
        <span>${typesText}</span>
      </div>
      <div class="hint-item" id="physical-hint">
        <span class="hint-label">${t.hintIDLabel}</span>
        <span>#${String(target.id).padStart(3, '0')}</span>
      </div>
    `;
  }

  async fetchExtraDetails(id) {
    try {
      let data = this.apiCache.get(`poke_${id}`);
      if (!data) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        data = await res.json();
        this.apiCache.set(`poke_${id}`, data);
      }

      const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
      const physHint = document.getElementById("physical-hint");
      if (physHint && this.currentQuiz && this.currentQuiz.target.id === id) {
        const h = (data.height / 10).toFixed(1);
        const w = (data.weight / 10).toFixed(1);
        physHint.innerHTML = `
          <span class="hint-label">${t.hintPhysLabel}</span>
          <span>${h} ${t.heightUnit} | ${w} ${t.weightUnit}</span>
        `;
      }
    } catch (e) {
      console.warn("Extra details fetch fallback:", e);
    }
  }

  renderOptionButtons(options, target) {
    this.optionsContainer.innerHTML = "";
    const isZh = this.currentLang === "zh";

    options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      const primaryName = isZh ? option.name : option.enName;
      const subName = isZh ? option.enName : option.name;

      btn.innerHTML = `
        <span>${primaryName}</span>
        <span style="font-size: 0.8rem; opacity: 0.7;">${subName}</span>
      `;

      btn.addEventListener("click", () => this.handleAnswerSelect(btn, option, target));
      this.optionsContainer.appendChild(btn);
    });
  }

  handleAnswerSelect(selectedBtn, selectedOption, target) {
    if (this.currentQuiz.answered) return;
    this.currentQuiz.answered = true;

    const allBtns = this.optionsContainer.querySelectorAll(".option-btn");
    allBtns.forEach(btn => (btn.disabled = true));

    const isCorrect = selectedOption.id === target.id;
    const t = TRANSLATIONS[this.currentLang] || TRANSLATIONS.en;
    const targetName = this.currentLang === "zh" ? target.name : target.enName;

    this.quizImg.classList.remove("silhouette");
    this.quizImg.classList.add("revealed");

    if (isCorrect) {
      selectedBtn.classList.add("correct");
      this.streak++;
      this.collectedIds.add(target.id);
      this.saveCollectedState();
      this.updateStatsUI();
      this.renderLodgeView();
      this.renderPokedexGrid();

      this.feedbackIcon.textContent = "🎉";
      this.feedbackTitle.textContent = t.correctTitle.replace("{name}", targetName);
      this.feedbackDesc.textContent = t.correctDesc;
      this.quizFeedback.classList.remove("hidden", "incorrect-bg");
    } else {
      selectedBtn.classList.add("wrong");
      this.streak = 0;
      this.updateStatsUI();

      allBtns.forEach(btn => {
        if (btn.textContent.includes(targetName)) {
          btn.classList.add("correct");
        }
      });

      this.feedbackIcon.textContent = "😅";
      this.feedbackTitle.textContent = t.wrongTitle.replace("{name}", targetName);
      this.feedbackDesc.textContent = t.wrongDesc;
      this.quizFeedback.classList.add("incorrect-bg");
      this.quizFeedback.classList.remove("hidden");
    }

    this.skipBtn.classList.add("hidden");
    this.nextBtn.classList.remove("hidden");
  }

  /* ------------------------------------------------------------------------
     图鉴 (Pokédex Grid Engine)
     ------------------------------------------------------------------------ */
  renderPokedexGrid() {
    this.pokedexGrid.innerHTML = "";
    const isZh = this.currentLang === "zh";

    POKEMON_DB.forEach(pokemon => {
      const isCollected = this.collectedIds.has(pokemon.id);
      const card = document.createElement("div");
      card.className = `poke-card ${isCollected ? "unlocked" : "locked"}`;
      card.setAttribute("data-id", pokemon.id);

      const displayName = isZh ? pokemon.name : pokemon.enName;

      card.setAttribute("data-name", pokemon.name.toLowerCase());
      card.setAttribute("data-en", pokemon.enName.toLowerCase());
      card.setAttribute("data-status", isCollected ? "collected" : "uncollected");
      card.setAttribute("data-types", pokemon.types.join(","));

      const typeBadges = pokemon.types
        .map(tp => {
          const label = TYPE_NAMES[tp] ? TYPE_NAMES[tp][this.currentLang] : tp;
          return `<span class="type-badge" style="background-color: var(--type-${tp});">${label}</span>`;
        })
        .join("");

      card.innerHTML = `
        <span class="poke-card-id">#${String(pokemon.id).padStart(3, "0")}</span>
        <div class="poke-card-img-wrap">
          <img class="poke-card-img" src="${this.getArtworkUrl(pokemon.id)}" alt="${displayName}" loading="lazy" />
        </div>
        <div class="poke-card-name">${isCollected ? displayName : "???"}</div>
        <div class="poke-card-types">${isCollected ? typeBadges : '<span class="type-badge" style="background-color: #CBD5E1; color: #475569;">???</span>'}</div>
      `;

      card.addEventListener("click", () => {
        if (isCollected) {
          this.openDetailModal(pokemon);
        } else {
          const msg = isZh
            ? `【${pokemon.name}】尚未解锁！去“冒险答题”中对碰并加入图鉴吧！`
            : `[${pokemon.enName}] is locked! Play Adventure Quiz to unlock it!`;
          alert(msg);
        }
      });

      this.pokedexGrid.appendChild(card);
    });

    this.filterPokedexGrid();
  }

  filterPokedexGrid() {
    const searchVal = this.searchInput.value.trim().toLowerCase();
    const statusVal = this.statusFilter.value;
    const typeVal = this.typeFilter.value;

    const cards = this.pokedexGrid.querySelectorAll(".poke-card");

    cards.forEach(card => {
      const id = card.getAttribute("data-id");
      const name = card.getAttribute("data-name");
      const en = card.getAttribute("data-en");
      const status = card.getAttribute("data-status");
      const types = card.getAttribute("data-types").split(",");

      const matchSearch =
        !searchVal ||
        name.includes(searchVal) ||
        en.includes(searchVal) ||
        id.toString() === searchVal ||
        `#${id}`.includes(searchVal);

      const matchStatus = statusVal === "all" || status === statusVal;
      const matchType = typeVal === "all" || types.includes(typeVal);

      if (matchSearch && matchStatus && matchType) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }

  /* ------------------------------------------------------------------------
     竞技对战系统 (Battle Arena System with Habitat Stages & 3h Cooldown)
     ------------------------------------------------------------------------ */
  renderBattleRoster() {
    this.battleRosterGrid.innerHTML = "";
    const isZh = this.currentLang === "zh";

    this.collectedIds.forEach(id => {
      const poke = POKEMON_DB.find(p => p.id === id);
      if (!poke) return;

      const isFaint = this.isFainted(poke.id);
      const card = document.createElement("div");
      card.className = `roster-card ${isFaint ? "disabled" : ""}`;
      card.setAttribute("data-fainted-id", poke.id);

      const name = isZh ? poke.name : poke.enName;

      card.innerHTML = `
        <img class="roster-img" src="${this.getArtworkUrl(poke.id)}" alt="${name}" />
        <span class="roster-name">${name}</span>
        <span class="roster-status ${isFaint ? "fainted" : "ready"}">
          ${isFaint ? `⏳ <span class="faint-time-str">${this.getRemainingCooldownText(poke.id)}</span>` : (isZh ? "准备就绪" : "Ready")}
        </span>
      `;

      card.addEventListener("click", () => {
        if (isFaint) {
          const msg = isZh
            ? `【${name}】处于晕厥中（剩余恢复时间: ${this.getRemainingCooldownText(poke.id)}），暂无法出战。`
            : `[${name}] is fainted (Time remaining: ${this.getRemainingCooldownText(poke.id)}) and cannot enter battle.`;
          alert(msg);
        } else {
          this.startBattle(poke);
        }
      });

      this.battleRosterGrid.appendChild(card);
    });
  }

  // 启动对战
  startBattle(playerPoke) {
    // 随机选择 1 只对手
    const oppPoke = POKEMON_DB[Math.floor(Math.random() * POKEMON_DB.length)];
    const isZh = this.currentLang === "zh";

    this.activeBattle = {
      player: {
        poke: playerPoke,
        maxHp: 100,
        hp: 100,
        move: isZh ? playerPoke.moveZh : playerPoke.moveEn
      },
      opponent: {
        poke: oppPoke,
        maxHp: 100,
        hp: 100,
        move: isZh ? oppPoke.moveZh : oppPoke.moveEn
      },
      turn: 1
    };

    // 根据对手主属性切换【专属生活生境背景】
    const mainType = oppPoke.types[0];
    this.arenaEnvironment.className = "arena-environment";

    const envMap = {
      water: "env-ocean", ice: "env-ice",
      fire: "env-volcano",
      electric: "env-electric", steel: "env-electric",
      grass: "env-forest", bug: "env-forest",
      flying: "env-sky",
      rock: "env-cave", ground: "env-cave", fighting: "env-cave",
      ghost: "env-mystery", psychic: "env-mystery", poison: "env-mystery", dragon: "env-mystery"
    };

    this.arenaEnvironment.classList.add(envMap[mainType] || "env-forest");

    const sceneNames = {
      "env-forest": isZh ? "森林对战场" : "FOREST BATTLEFIELD",
      "env-sky": isZh ? "天空对战场" : "SKY BATTLEFIELD",
      "env-ice": isZh ? "冰川对战场" : "GLACIER BATTLEFIELD",
      "env-ocean": isZh ? "海岸对战场" : "COASTAL BATTLEFIELD",
      "env-volcano": isZh ? "火山对战场" : "VOLCANIC BATTLEFIELD",
      "env-cave": isZh ? "岩洞对战场" : "CAVE BATTLEFIELD",
      "env-electric": isZh ? "雷鸣对战场" : "THUNDER BATTLEFIELD",
      "env-mystery": isZh ? "幽影对战场" : "SHADOW BATTLEFIELD"
    };
    const sceneClass = envMap[mainType] || "env-forest";
    this.arenaSceneLabel.textContent = sceneNames[sceneClass];
    this.spawnArenaParticles(mainType);

    // 设置名字与属性 Badge
    this.playerName.textContent = isZh ? playerPoke.name : playerPoke.enName;
    this.playerTypeBadge.textContent = TYPE_NAMES[playerPoke.types[0]] ? TYPE_NAMES[playerPoke.types[0]][this.currentLang] : playerPoke.types[0];
    this.playerSprite.src = this.getArtworkUrl(playerPoke.id);

    this.oppName.textContent = isZh ? oppPoke.name : oppPoke.enName;
    this.oppTypeBadge.textContent = TYPE_NAMES[oppPoke.types[0]] ? TYPE_NAMES[oppPoke.types[0]][this.currentLang] : oppPoke.types[0];
    this.oppSprite.src = this.getArtworkUrl(oppPoke.id);

    this.actionAttackName.textContent = isZh ? playerPoke.moveZh : playerPoke.moveEn;
    this.actionSpecialName.textContent = isZh ? " Z-必杀冲击" : "Special Strike";

    this.updateBattleHP();

    const oppNameStr = isZh ? oppPoke.name : oppPoke.enName;
    this.battleLogText.textContent = isZh
      ? `野生宝可梦【${oppNameStr}】出场了！战斗生境：${TYPE_NAMES[mainType] ? TYPE_NAMES[mainType].zh : mainType}！选择招式开始对决！`
      : `Wild ${oppNameStr} appeared! Habitat Stage: ${mainType}! Select your action!`;

    // 切换视窗
    this.battleRosterStage.classList.add("hidden");
    this.battleArenaStage.classList.remove("hidden");
    this.playerSprite.classList.remove("battle-enter", "battle-faint", "battle-hit", "battle-lunge", "battle-guard");
    this.oppSprite.classList.remove("battle-enter", "battle-faint", "battle-hit", "battle-lunge", "battle-guard");
    requestAnimationFrame(() => {
      this.playerSprite.classList.add("battle-enter");
      this.oppSprite.classList.add("battle-enter");
    });
    this.setBattleActionsDisabled(false);
  }

  setBattleActionsDisabled(disabled) {
    [this.btnAttack, this.btnSpecial, this.btnDefend, this.btnForfeit].forEach(btn => {
      if (btn) btn.disabled = disabled;
    });
  }

  spawnArenaParticles(type) {
    if (!this.arenaParticles) return;
    const palette = type === "ice" ? ["#E0F2FE", "#67E8F9", "#FFFFFF"] : type === "fire" ? ["#F97316", "#FDE047", "#F43F5E"] : type === "electric" ? ["#FDE047", "#FFFFFF", "#A78BFA"] : ["#BBF7D0", "#FDE68A", "#FFFFFF"];
    this.arenaParticles.innerHTML = "";
    for (let i = 0; i < 18; i += 1) {
      const particle = document.createElement("span");
      particle.className = "arena-particle";
      particle.style.setProperty("--x", `${Math.random() * 100}%`);
      particle.style.setProperty("--y", `${25 + Math.random() * 65}%`);
      particle.style.setProperty("--dx", `${(Math.random() - .5) * 80}px`);
      particle.style.setProperty("--dy", `${-20 - Math.random() * 70}px`);
      particle.style.setProperty("--size", `${3 + Math.random() * 7}px`);
      particle.style.setProperty("--particle-color", palette[i % palette.length]);
      particle.style.animationDelay = `${Math.random() * 1.8}s`;
      this.arenaParticles.appendChild(particle);
    }
  }

  triggerBattleEffect(attacker, defender, actionType, damage, critical = false) {
    const attackerSprite = attacker === "player" ? this.playerSprite : this.oppSprite;
    const defenderSprite = defender === "player" ? this.playerSprite : this.oppSprite;
    attackerSprite.style.setProperty("--lunge", attacker === "player" ? "30px" : "-30px");
    attackerSprite.classList.remove("battle-lunge", "battle-guard");
    defenderSprite.classList.remove("battle-hit");
    void attackerSprite.offsetWidth;
    if (actionType === "defend") attackerSprite.classList.add("battle-guard");
    else attackerSprite.classList.add("battle-lunge");
    if (damage > 0) {
      defenderSprite.classList.add("battle-hit");
      this.arenaEnvironment.classList.remove("battle-shake");
      this.arenaFlash.classList.remove("active");
      void this.arenaEnvironment.offsetWidth;
      this.arenaEnvironment.classList.add("battle-shake");
      this.arenaFlash.classList.add("active");
      this.spawnDamageNumber(damage, defenderSprite, critical);
      this.spawnHitParticles(defenderSprite, critical ? "#FDE047" : "#FFFFFF");
    }
  }

  spawnDamageNumber(damage, target, critical) {
    const arenaRect = this.arenaEnvironment.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const number = document.createElement("span");
    number.className = `damage-number ${critical ? "critical" : ""}`;
    number.textContent = `${critical ? "CRIT! " : "-"}${damage}`;
    number.style.setProperty("--x", `${((targetRect.left + targetRect.width / 2 - arenaRect.left) / arenaRect.width) * 100}%`);
    number.style.setProperty("--y", `${((targetRect.top + targetRect.height / 3 - arenaRect.top) / arenaRect.height) * 100}%`);
    number.style.setProperty("--damage-color", critical ? "#FDE047" : "#FB7185");
    this.damageLayer.appendChild(number);
    setTimeout(() => number.remove(), 950);
  }

  spawnHitParticles(target, color) {
    const arenaRect = this.arenaEnvironment.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    for (let i = 0; i < 8; i += 1) {
      const particle = document.createElement("span");
      particle.className = "arena-particle";
      particle.style.setProperty("--x", `${((targetRect.left + targetRect.width / 2 - arenaRect.left) / arenaRect.width) * 100}%`);
      particle.style.setProperty("--y", `${((targetRect.top + targetRect.height / 2 - arenaRect.top) / arenaRect.height) * 100}%`);
      particle.style.setProperty("--dx", `${(Math.random() - .5) * 130}px`);
      particle.style.setProperty("--dy", `${(Math.random() - .5) * 100}px`);
      particle.style.setProperty("--size", `${4 + Math.random() * 6}px`);
      particle.style.setProperty("--particle-color", color);
      this.arenaParticles.appendChild(particle);
      setTimeout(() => particle.remove(), 750);
    }
  }

  updateBattleHP() {
    const p = this.activeBattle.player;
    const o = this.activeBattle.opponent;

    this.playerHpCurr.textContent = p.hp;
    this.playerHpMax.textContent = p.maxHp;
    this.playerHpFill.style.width = `${Math.max(0, p.hp)}%`;

    this.oppHpCurr.textContent = o.hp;
    this.oppHpMax.textContent = o.maxHp;
    this.oppHpFill.style.width = `${Math.max(0, o.hp)}%`;
  }

  // 执行战斗回合 (Player Move -> Opponent Counter Attack)
  executeBattleTurn(actionType) {
    if (!this.activeBattle) return;
    this.setBattleActionsDisabled(true);
    const isZh = this.currentLang === "zh";
    const p = this.activeBattle.player;
    const o = this.activeBattle.opponent;

    // 计算我方属性克制倍率
    const pType = p.poke.types[0];
    const oType = o.poke.types[0];
    let mult = (TYPE_CHART[pType] && TYPE_CHART[pType][oType] !== undefined) ? TYPE_CHART[pType][oType] : 1.0;

    let pDamage = 0;
    let actionDesc = "";

    if (actionType === "attack") {
      pDamage = Math.round((20 + Math.random() * 10) * mult);
      actionDesc = isZh ? `使用了【${p.move}】！` : `used [${p.move}]!`;
    } else if (actionType === "special") {
      pDamage = Math.round((32 + Math.random() * 12) * mult);
      actionDesc = isZh ? `爆发全能特攻！` : `launched a Special Strike!`;
    } else if (actionType === "defend") {
      pDamage = 0;
      actionDesc = isZh ? `采取防守姿态，降低即将到来的伤害！` : `took a Defensive Guard!`;
    }

    let effText = "";
    if (mult > 1.0) effText = isZh ? "（效果绝佳！🔥）" : " (Super Effective! 🔥)";
    if (mult < 1.0 && mult > 0) effText = isZh ? "（效果不理想……）" : " (Not very effective...)";

    const isCritical = actionType === "special" && Math.random() < 0.25;
    if (isCritical) pDamage = Math.round(pDamage * 1.35);
    o.hp = Math.max(0, o.hp - pDamage);
    this.triggerBattleEffect("player", "opponent", actionType, pDamage, isCritical);
    this.updateBattleHP();

    const pName = isZh ? p.poke.name : p.poke.enName;
    const oName = isZh ? o.poke.name : o.poke.enName;

    this.battleLogText.textContent = isZh
      ? `【${pName}】${actionDesc} 对【${oName}】造成 ${pDamage} 点伤害！${effText}`
      : `[${pName}] ${actionDesc} Dealt ${pDamage} DMG to [${oName}]!${effText}`;

    // 检查对手是否倒下
    if (o.hp <= 0) {
      setTimeout(() => this.endBattle(true, false), 800);
      return;
    }

    // 对手反击
    setTimeout(() => {
      let oDamage = Math.round(15 + Math.random() * 12);
      if (actionType === "defend") oDamage = Math.round(oDamage * 0.4);

      p.hp = Math.max(0, p.hp - oDamage);
      this.triggerBattleEffect("opponent", "player", "attack", oDamage, false);
      this.updateBattleHP();

      this.battleLogText.textContent += isZh
        ? ` ➔ 【${oName}】反击使用【${o.move}】，对我方造成 ${oDamage} 点伤害！`
        : ` ➔ Wild [${oName}] countered with [${o.move}], dealing ${oDamage} DMG!`;

      if (p.hp <= 0) {
        setTimeout(() => this.endBattle(false, false), 800);
      } else {
        this.setBattleActionsDisabled(false);
      }
    }, 900);
  }

  // 战斗结算：成功 vs 失败 (触感 3 小时晕厥惩罚)
  endBattle(isVictory, isForfeit) {
    const isZh = this.currentLang === "zh";
    const pPoke = this.activeBattle.player.poke;
    const pName = isZh ? pPoke.name : pPoke.enName;

    this.faintWarningBox.classList.add("hidden");

    if (isVictory) {
      this.resultIcon.textContent = "🏆";
      this.resultTitle.textContent = isZh ? "对战胜利！" : "Victory!";
      this.resultDesc.textContent = isZh
        ? `太棒了！你的【${pName}】完美击败了野生宝可梦！`
        : `Awesome! Your [${pName}] dominated the wild Pokémon!`;
    } else {
      // 失败惩罚：设置 3 小时晕厥冷却 (3 * 3600 * 1000 ms)
      const faintedUntil = Date.now() + 3 * 60 * 60 * 1000;
      this.faintedMap[pPoke.id] = faintedUntil;
      this.saveFaintedState();

      this.resultIcon.textContent = "💤";
      this.resultTitle.textContent = isZh ? "战斗失败！" : "Defeat!";
      this.resultDesc.textContent = isZh
        ? `可惜！你的【${pName}】在强劲的对手面前不敌倒下了。`
        : `Unfortunate! Your [${pName}] was fainted in battle.`;

      this.faintWarningBox.classList.remove("hidden");
    }

    this.battleResultModal.classList.remove("hidden");
    this.setBattleActionsDisabled(true);
    if (isVictory) this.oppSprite.classList.add("battle-faint");
    else this.playerSprite.classList.add("battle-faint");
    this.renderLodgeView(); // 重新刷新训练师小屋显示变黑倒计时
  }

  /* ------------------------------------------------------------------------
     详情 Modal Viewer
     ------------------------------------------------------------------------ */
  async openDetailModal(pokemon) {
    const isZh = this.currentLang === "zh";
    this.modalId.textContent = `#${String(pokemon.id).padStart(3, "0")}`;
    this.modalTitle.textContent = isZh ? pokemon.name : pokemon.enName;
    this.modalEnName.textContent = isZh ? pokemon.enName : pokemon.name;
    this.modalImage.src = this.getArtworkUrl(pokemon.id);

    this.modalTypes.innerHTML = pokemon.types
      .map(tp => {
        const label = TYPE_NAMES[tp] ? TYPE_NAMES[tp][this.currentLang] : tp;
        return `<span class="type-badge" style="background-color: var(--type-${tp}); padding: 4px 12px; font-size: 0.8rem;">${label}</span>`;
      })
      .join("");

    this.modalFlavor.textContent = "Syncing Pokédex archive data...";
    this.detailModal.classList.remove("hidden");

    this.updateModalStatBar(this.statHp, this.statHpNum, 50);
    this.updateModalStatBar(this.statAtk, this.statAtkNum, 50);
    this.updateModalStatBar(this.statDef, this.statDefNum, 50);
    this.updateModalStatBar(this.statSpd, this.statSpdNum, 50);

    try {
      let data = this.apiCache.get(`poke_${pokemon.id}`);
      if (!data) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        data = await res.json();
        this.apiCache.set(`poke_${pokemon.id}`, data);
      }

      this.modalHeight.textContent = `${(data.height / 10).toFixed(1)} m`;
      this.modalWeight.textContent = `${(data.weight / 10).toFixed(1)} kg`;

      const statsMap = {};
      data.stats.forEach(s => (statsMap[s.stat.name] = s.base_stat));

      this.updateModalStatBar(this.statHp, this.statHpNum, statsMap["hp"] || 50);
      this.updateModalStatBar(this.statAtk, this.statAtkNum, statsMap["attack"] || 50);
      this.updateModalStatBar(this.statDef, this.statDefNum, statsMap["defense"] || 50);
      this.updateModalStatBar(this.statSpd, this.statSpdNum, statsMap["speed"] || 50);

      let speciesData = this.apiCache.get(`species_${pokemon.id}`);
      if (!speciesData) {
        const resSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`);
        speciesData = await resSpecies.json();
        this.apiCache.set(`species_${pokemon.id}`, speciesData);
      }

      const langCode = isZh ? "zh-Hans" : "en";
      const entry = speciesData.flavor_text_entries.find(e => e.language.name === langCode || e.language.name === "en");

      if (entry) {
        this.modalFlavor.textContent = entry.flavor_text.replace(/[\r\n\x0c]/g, " ");
      } else {
        this.modalFlavor.textContent = "Collected Pokédex entry unlocked!";
      }
    } catch (e) {
      console.warn("Modal details fetch error:", e);
      this.modalFlavor.textContent = "Collected Pokédex entry!";
    }
  }

  updateModalStatBar(barEl, numEl, val) {
    const percent = Math.min(100, Math.round((val / 150) * 100));
    barEl.style.width = `${percent}%`;
    numEl.textContent = val;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.app = new PokemonApp();
});
