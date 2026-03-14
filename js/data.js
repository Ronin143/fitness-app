// --- STATIC MOCK DATABASE ---
const getExercises = () => [
  // Разминка/Заминка
  { id: 18, name: window.miniappI18n.t('exercises.ex_18_name'), group: window.miniappI18n.t('exercises.ex_18_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🤸', technique: window.miniappI18n.t('exercises.ex_18_tech') },
  { id: 19, name: window.miniappI18n.t('exercises.ex_19_name'), group: window.miniappI18n.t('exercises.ex_19_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🧘‍♂️', technique: window.miniappI18n.t('exercises.ex_19_tech') },
  // Грудь
  { id: 1, name: window.miniappI18n.t('exercises.ex_1_name'), group: window.miniappI18n.t('exercises.ex_1_group'), equipment: 'bodyweight', level: 'beginner', emoji: '👐', technique: window.miniappI18n.t('exercises.ex_1_tech') },
  { id: 2, name: window.miniappI18n.t('exercises.ex_2_name'), group: window.miniappI18n.t('exercises.ex_2_group'), equipment: 'barbell', level: 'intermediate', emoji: '🏋️‍♀️', technique: window.miniappI18n.t('exercises.ex_2_tech') },
  { id: 3, name: window.miniappI18n.t('exercises.ex_3_name'), group: window.miniappI18n.t('exercises.ex_3_group'), equipment: 'dumbbell', level: 'intermediate', emoji: '🏋️', technique: window.miniappI18n.t('exercises.ex_3_tech') },
  { id: 16, name: window.miniappI18n.t('exercises.ex_16_name'), group: window.miniappI18n.t('exercises.ex_16_group'), equipment: 'machine', level: 'beginner', emoji: '🦋', technique: window.miniappI18n.t('exercises.ex_16_tech') },
  { id: 28, name: window.miniappI18n.t('exercises.ex_28_name'), group: window.miniappI18n.t('exercises.ex_28_group'), equipment: 'dumbbell', level: 'intermediate', emoji: '📐', technique: window.miniappI18n.t('exercises.ex_28_tech') },
  { id: 34, name: window.miniappI18n.t('exercises.ex_34_name'), group: window.miniappI18n.t('exercises.ex_34_group'), equipment: 'bodyweight', level: 'advanced', emoji: '💥', technique: window.miniappI18n.t('exercises.ex_34_tech') },
  
  // Спина
  { id: 4, name: window.miniappI18n.t('exercises.ex_4_name'), group: window.miniappI18n.t('exercises.ex_4_group'), equipment: 'bodyweight', level: 'intermediate', emoji: '🧗‍♂️', technique: window.miniappI18n.t('exercises.ex_4_tech') },
  { id: 5, name: window.miniappI18n.t('exercises.ex_5_name'), group: window.miniappI18n.t('exercises.ex_5_group'), equipment: 'barbell', level: 'intermediate', emoji: '🏋️‍♀️', technique: window.miniappI18n.t('exercises.ex_5_tech') },
  { id: 6, name: window.miniappI18n.t('exercises.ex_6_name'), group: window.miniappI18n.t('exercises.ex_6_group'), equipment: 'dumbbell', level: 'beginner', emoji: '🏋️', technique: window.miniappI18n.t('exercises.ex_6_tech') },
  { id: 15, name: window.miniappI18n.t('exercises.ex_15_name'), group: window.miniappI18n.t('exercises.ex_15_group'), equipment: 'machine', level: 'beginner', emoji: '🧗‍♂️', technique: window.miniappI18n.t('exercises.ex_15_tech') },
  { id: 23, name: window.miniappI18n.t('exercises.ex_23_name'), group: window.miniappI18n.t('exercises.ex_23_group'), equipment: 'barbell', level: 'advanced', emoji: '🏋️‍♀️', technique: window.miniappI18n.t('exercises.ex_23_tech') },
  { id: 29, name: window.miniappI18n.t('exercises.ex_29_name'), group: window.miniappI18n.t('exercises.ex_29_group'), equipment: 'machine', level: 'beginner', emoji: '🚣', technique: window.miniappI18n.t('exercises.ex_29_tech') },
  { id: 32, name: window.miniappI18n.t('exercises.ex_32_name'), group: window.miniappI18n.t('exercises.ex_32_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🦐', technique: window.miniappI18n.t('exercises.ex_32_tech') },

  // Ноги
  { id: 7, name: window.miniappI18n.t('exercises.ex_7_name'), group: window.miniappI18n.t('exercises.ex_7_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🦵', technique: window.miniappI18n.t('exercises.ex_7_tech') },
  { id: 8, name: window.miniappI18n.t('exercises.ex_8_name'), group: window.miniappI18n.t('exercises.ex_8_group'), equipment: 'barbell', level: 'intermediate', emoji: '🏋️‍♀️', technique: window.miniappI18n.t('exercises.ex_8_tech') },
  { id: 9, name: window.miniappI18n.t('exercises.ex_9_name'), group: window.miniappI18n.t('exercises.ex_9_group'), equipment: 'dumbbell', level: 'intermediate', emoji: '🏋️', technique: window.miniappI18n.t('exercises.ex_9_tech') },
  { id: 14, name: window.miniappI18n.t('exercises.ex_14_name'), group: window.miniappI18n.t('exercises.ex_14_group'), equipment: 'machine', level: 'beginner', emoji: '🦵', technique: window.miniappI18n.t('exercises.ex_14_tech') },
  { id: 17, name: window.miniappI18n.t('exercises.ex_17_name'), group: window.miniappI18n.t('exercises.ex_17_group'), equipment: 'machine', level: 'beginner', emoji: '🦵', technique: window.miniappI18n.t('exercises.ex_17_tech') },
  { id: 24, name: window.miniappI18n.t('exercises.ex_24_name'), group: window.miniappI18n.t('exercises.ex_24_group'), equipment: 'dumbbell', level: 'intermediate', emoji: '🏋️', technique: window.miniappI18n.t('exercises.ex_24_tech') },
  { id: 30, name: window.miniappI18n.t('exercises.ex_30_name'), group: window.miniappI18n.t('exercises.ex_30_group'), equipment: 'machine', level: 'beginner', emoji: '🦵', technique: window.miniappI18n.t('exercises.ex_30_tech') },
  { id: 31, name: window.miniappI18n.t('exercises.ex_31_name'), group: window.miniappI18n.t('exercises.ex_31_group'), equipment: 'machine', level: 'beginner', emoji: '🩰', technique: window.miniappI18n.t('exercises.ex_31_tech') },
  { id: 35, name: window.miniappI18n.t('exercises.ex_35_name'), group: window.miniappI18n.t('exercises.ex_35_group'), equipment: 'barbell', level: 'advanced', emoji: '🦵', technique: window.miniappI18n.t('exercises.ex_35_tech') },
  { id: 36, name: window.miniappI18n.t('exercises.ex_36_name'), group: window.miniappI18n.t('exercises.ex_36_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🍑', technique: window.miniappI18n.t('exercises.ex_36_tech') },

  // Плечи
  { id: 10, name: window.miniappI18n.t('exercises.ex_10_name'), group: window.miniappI18n.t('exercises.ex_10_group'), equipment: 'barbell', level: 'intermediate', emoji: '🏋️‍♀️', technique: window.miniappI18n.t('exercises.ex_10_tech') },
  { id: 11, name: window.miniappI18n.t('exercises.ex_11_name'), group: window.miniappI18n.t('exercises.ex_11_group'), equipment: 'dumbbell', level: 'beginner', emoji: '🏋️', technique: window.miniappI18n.t('exercises.ex_11_tech') },
  { id: 25, name: window.miniappI18n.t('exercises.ex_25_name'), group: window.miniappI18n.t('exercises.ex_25_group'), equipment: 'dumbbell', level: 'beginner', emoji: '🦅', technique: window.miniappI18n.t('exercises.ex_25_tech') },
  { id: 38, name: window.miniappI18n.t('exercises.ex_38_name'), group: window.miniappI18n.t('exercises.ex_38_group'), equipment: 'dumbbell', level: 'intermediate', emoji: '🔄', technique: window.miniappI18n.t('exercises.ex_38_tech') },
  { id: 39, name: window.miniappI18n.t('exercises.ex_39_name'), group: window.miniappI18n.t('exercises.ex_39_group'), equipment: 'barbell', level: 'intermediate', emoji: '💪', technique: window.miniappI18n.t('exercises.ex_39_tech') },

  // Руки (Бицепс/Трицепс)
  { id: 12, name: window.miniappI18n.t('exercises.ex_12_name'), group: window.miniappI18n.t('exercises.ex_12_group'), equipment: 'barbell', level: 'beginner', emoji: '💪', technique: window.miniappI18n.t('exercises.ex_12_tech') },
  { id: 13, name: window.miniappI18n.t('exercises.ex_13_name'), group: window.miniappI18n.t('exercises.ex_13_group'), equipment: 'bodyweight', level: 'intermediate', emoji: '🤸', technique: window.miniappI18n.t('exercises.ex_13_tech') },
  { id: 26, name: window.miniappI18n.t('exercises.ex_26_name'), group: window.miniappI18n.t('exercises.ex_26_group'), equipment: 'machine', level: 'beginner', emoji: '🦾', technique: window.miniappI18n.t('exercises.ex_26_tech') },
  { id: 27, name: window.miniappI18n.t('exercises.ex_27_name'), group: window.miniappI18n.t('exercises.ex_27_group'), equipment: 'dumbbell', level: 'beginner', emoji: '🔨', technique: window.miniappI18n.t('exercises.ex_27_tech') },
  { id: 40, name: window.miniappI18n.t('exercises.ex_40_name'), group: window.miniappI18n.t('exercises.ex_40_group'), equipment: 'barbell', level: 'intermediate', emoji: '🇫🇷', technique: window.miniappI18n.t('exercises.ex_40_tech') },

  // Пресс
  { id: 20, name: window.miniappI18n.t('exercises.ex_20_name'), group: window.miniappI18n.t('exercises.ex_20_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🔥', technique: window.miniappI18n.t('exercises.ex_20_tech') },
  { id: 21, name: window.miniappI18n.t('exercises.ex_21_name'), group: window.miniappI18n.t('exercises.ex_21_group'), equipment: 'bodyweight', level: 'beginner', emoji: '🧱', technique: window.miniappI18n.t('exercises.ex_21_tech') },
  { id: 22, name: window.miniappI18n.t('exercises.ex_22_name'), group: window.miniappI18n.t('exercises.ex_22_group'), equipment: 'bodyweight', level: 'intermediate', emoji: '🤸', technique: window.miniappI18n.t('exercises.ex_22_tech') },
  { id: 33, name: window.miniappI18n.t('exercises.ex_33_name'), group: window.miniappI18n.t('exercises.ex_33_group'), equipment: 'machine', level: 'intermediate', emoji: '⚡', technique: window.miniappI18n.t('exercises.ex_33_tech') }
];

const getFoodDatabase = () => [
  { id: 'f1', name: window.miniappI18n.t('food_db.chicken') || 'Куриная грудка', cals: 113, p: 23.6, f: 1.9, c: 0.4 },
  { id: 'f2', name: window.miniappI18n.t('food_db.buckwheat') || 'Гречка', cals: 343, p: 13, f: 3.4, c: 71.5 },
  { id: 'f3', name: window.miniappI18n.t('food_db.rice') || 'Рис', cals: 344, p: 6.7, f: 0.7, c: 78.9 },
  { id: 'f4', name: window.miniappI18n.t('food_db.oats') || 'Овсянка', cals: 389, p: 16.9, f: 6.9, c: 66.3 },
  { id: 'f5', name: window.miniappI18n.t('food_db.egg') || 'Яйцо куриное', cals: 155, p: 13, f: 11, c: 1.1 },
  { id: 'f6', name: window.miniappI18n.t('food_db.beef') || 'Говядина', cals: 187, p: 25, f: 10, c: 0 },
  { id: 'f7', name: window.miniappI18n.t('food_db.salmon') || 'Лосось', cals: 208, p: 20, f: 13, c: 0 },
  { id: 'f8', name: window.miniappI18n.t('food_db.cottage_cheese') || 'Творог 5%', cals: 121, p: 17, f: 5, c: 1.8 },
  { id: 'f9', name: window.miniappI18n.t('food_db.milk') || 'Молоко', cals: 54, p: 2.9, f: 2.5, c: 4.8 },
  { id: 'f10', name: window.miniappI18n.t('food_db.cheese') || 'Сыр', cals: 360, p: 24, f: 29, c: 0 },
  { id: 'f11', name: window.miniappI18n.t('food_db.bread') || 'Хлеб', cals: 240, p: 9, f: 3, c: 43 },
  { id: 'f12', name: window.miniappI18n.t('food_db.potato') || 'Картофель', cals: 77, p: 2, f: 0.4, c: 17 },
  { id: 'f13', name: window.miniappI18n.t('food_db.pasta') || 'Макароны', cals: 350, p: 12, f: 1.5, c: 71 },
  { id: 'f14', name: window.miniappI18n.t('food_db.banana') || 'Банан', cals: 89, p: 1.1, f: 0.3, c: 23 },
  { id: 'f15', name: window.miniappI18n.t('food_db.apple') || 'Яблоко', cals: 52, p: 0.3, f: 0.2, c: 14 },
  { id: 'f16', name: window.miniappI18n.t('food_db.cucumber') || 'Огурец', cals: 15, p: 0.6, f: 0.1, c: 3.6 },
  { id: 'f17', name: window.miniappI18n.t('food_db.tomato') || 'Помидор', cals: 18, p: 0.9, f: 0.2, c: 3.9 },
  { id: 'f18', name: window.miniappI18n.t('food_db.olive_oil') || 'Масло', cals: 884, p: 0, f: 100, c: 0 },
  { id: 'f19', name: window.miniappI18n.t('food_db.avocado') || 'Авокадо', cals: 160, p: 2, f: 15, c: 9 },
  { id: 'f20', name: window.miniappI18n.t('food_db.almond') || 'Миндаль', cals: 579, p: 21, f: 50, c: 22 },
  { id: 'f21', name: window.miniappI18n.t('food_db.bread_rye') || 'Хлеб ржаной', cals: 259, p: 8.5, f: 3.3, c: 48 },
  { id: 'f22', name: window.miniappI18n.t('food_db.bread_white') || 'Хлеб пшеничный', cals: 265, p: 9, f: 3, c: 50 },
  { id: 'f23', name: window.miniappI18n.t('food_db.bread_borodinsky') || 'Хлеб бородинский', cals: 208, p: 6.8, f: 1.3, c: 40 },
  { id: 'f24', name: window.miniappI18n.t('food_db.lavash') || 'Лаваш тонкий', cals: 236, p: 7.9, f: 1, c: 47 },
  { id: 'f25', name: window.miniappI18n.t('food_db.crispbread') || 'Хлебцы', cals: 300, p: 10, f: 2, c: 60 },
  { id: 'f26', name: window.miniappI18n.t('food_db.bulgur') || 'Булгур', cals: 342, p: 12, f: 1.3, c: 76 },
  { id: 'f27', name: window.miniappI18n.t('food_db.quinoa') || 'Киноа', cals: 368, p: 14, f: 6, c: 64 },
  { id: 'f28', name: window.miniappI18n.t('food_db.lentils') || 'Чечевица', cals: 353, p: 25, f: 1, c: 60 },
  { id: 'f29', name: window.miniappI18n.t('food_db.beans') || 'Фасоль', cals: 333, p: 24, f: 1, c: 60 },
  { id: 'f30', name: window.miniappI18n.t('food_db.chickpeas') || 'Нут', cals: 364, p: 19, f: 6, c: 61 },
  { id: 'f31', name: window.miniappI18n.t('food_db.turkey') || 'Индейка', cals: 114, p: 23.6, f: 1.5, c: 0 },
  { id: 'f32', name: window.miniappI18n.t('food_db.pork') || 'Свинина', cals: 143, p: 21, f: 7, c: 0 },
  { id: 'f33', name: window.miniappI18n.t('food_db.tuna') || 'Тунец', cals: 96, p: 21, f: 1, c: 0 },
  { id: 'f34', name: window.miniappI18n.t('food_db.shrimp') || 'Креветки', cals: 99, p: 24, f: 0.3, c: 0 },
  { id: 'f35', name: window.miniappI18n.t('food_db.squid') || 'Кальмар', cals: 92, p: 18, f: 2, c: 0 },
  { id: 'f36', name: window.miniappI18n.t('food_db.pollock') || 'Минтай', cals: 72, p: 16, f: 1, c: 0 },
  { id: 'f37', name: window.miniappI18n.t('food_db.kefir') || 'Кефир 1%', cals: 40, p: 3, f: 1, c: 4 },
  { id: 'f38', name: window.miniappI18n.t('food_db.yogurt') || 'Греческий йогурт', cals: 60, p: 10, f: 0.4, c: 3.6 },
  { id: 'f39', name: window.miniappI18n.t('food_db.sour_cream') || 'Сметана 15%', cals: 158, p: 2.6, f: 15, c: 3.6 },
  { id: 'f40', name: window.miniappI18n.t('food_db.mozzarella') || 'Моцарелла', cals: 280, p: 28, f: 16, c: 3 },
  { id: 'f41', name: window.miniappI18n.t('food_db.cottage_cheese_9') || 'Творог 9%', cals: 159, p: 16, f: 9, c: 3 },
  { id: 'f42', name: window.miniappI18n.t('food_db.orange') || 'Апельсин', cals: 43, p: 0.9, f: 0.2, c: 8.1 },
  { id: 'f43', name: window.miniappI18n.t('food_db.cabbage') || 'Капуста', cals: 25, p: 1.3, f: 0.1, c: 5.8 },
  { id: 'f44', name: window.miniappI18n.t('food_db.broccoli') || 'Брокколи', cals: 34, p: 2.8, f: 0.4, c: 6.6 },
  { id: 'f45', name: window.miniappI18n.t('food_db.carrot') || 'Морковь', cals: 41, p: 0.9, f: 0.2, c: 9.6 },
  { id: 'f46', name: window.miniappI18n.t('food_db.bell_pepper') || 'Перец болгарский', cals: 27, p: 1.3, f: 0, c: 5.3 },
  { id: 'f47', name: window.miniappI18n.t('food_db.strawberry') || 'Клубника', cals: 32, p: 0.7, f: 0.3, c: 7.7 },
  { id: 'f48', name: window.miniappI18n.t('food_db.butter') || 'Масло сливочное', cals: 748, p: 0.5, f: 82.5, c: 0.8 },
  { id: 'f49', name: window.miniappI18n.t('food_db.walnut') || 'Грецкий орех', cals: 654, p: 15.2, f: 65.2, c: 13.7 },
  { id: 'f50', name: window.miniappI18n.t('food_db.peanut') || 'Арахис', cals: 567, p: 25.8, f: 49.2, c: 16.1 },
  // New expansions
  { id: 'f51', name: window.miniappI18n.t('food_db.cream_cheese') || 'Творожный сыр', cals: 240, p: 6, f: 23, c: 3 },
  { id: 'f52', name: window.miniappI18n.t('food_db.syrniki') || 'Сырники', cals: 230, p: 15, f: 10, c: 20 },
  { id: 'f53', name: window.miniappI18n.t('food_db.blueberry') || 'Голубика', cals: 39, p: 1, f: 0.5, c: 7.6 },
  { id: 'f54', name: window.miniappI18n.t('food_db.raspberry') || 'Малина', cals: 46, p: 0.8, f: 0.5, c: 8.3 },
  { id: 'f55', name: window.miniappI18n.t('food_db.kiwi') || 'Киви', cals: 47, p: 0.8, f: 0.4, c: 8.1 },
  { id: 'f56', name: window.miniappI18n.t('food_db.grapefruit') || 'Грейпфрут', cals: 29, p: 0.7, f: 0.2, c: 6.5 },
  { id: 'f57', name: window.miniappI18n.t('food_db.mango') || 'Манго', cals: 67, p: 0.5, f: 0.3, c: 15 },
  { id: 'f58', name: window.miniappI18n.t('food_db.spinach') || 'Шпинат', cals: 22, p: 2.9, f: 0.3, c: 2 },
  { id: 'f59', name: window.miniappI18n.t('food_db.couscous') || 'Кускус', cals: 376, p: 12.8, f: 0.6, c: 77.4 },
  { id: 'f60', name: window.miniappI18n.t('food_db.pearl_barley') || 'Перловка', cals: 320, p: 9.3, f: 1.1, c: 73.7 },
  { id: 'f61', name: window.miniappI18n.t('food_db.cashew') || 'Кешью', cals: 553, p: 18.2, f: 43.8, c: 30.2 },
  { id: 'f62', name: window.miniappI18n.t('food_db.pistachio') || 'Фисташки', cals: 556, p: 20, f: 50, c: 7 },
  { id: 'f63', name: window.miniappI18n.t('food_db.dark_chocolate') || 'Темный шоколад', cals: 546, p: 5, f: 31, c: 61 },
  { id: 'f64', name: window.miniappI18n.t('food_db.whey_protein') || 'Протеин сывороточный', cals: 380, p: 80, f: 4, c: 6 },
  { id: 'f65', name: window.miniappI18n.t('food_db.chia') || 'Семена чиа', cals: 486, p: 16.5, f: 30.7, c: 42.1 },
  { id: 'f66', name: window.miniappI18n.t('food_db.beef_liver') || 'Говяжья печень', cals: 127, p: 17.9, f: 3.7, c: 5.3 },
  { id: 'f67', name: window.miniappI18n.t('food_db.chicken_liver') || 'Куриная печень', cals: 137, p: 20.4, f: 5.9, c: 0.7 },
  { id: 'f68', name: window.miniappI18n.t('food_db.rabbit') || 'Мясо кролика', cals: 156, p: 21.1, f: 8, c: 0 },
  { id: 'f69', name: window.miniappI18n.t('food_db.cod') || 'Треска', cals: 69, p: 16, f: 0.6, c: 0 },
  { id: 'f70', name: window.miniappI18n.t('food_db.red_caviar') || 'Икра красная', cals: 249, p: 31.5, f: 13.2, c: 1 }
];

const getMockMeals = () => [
  { id: 'm1', name: 'Овсянка с ягодами и орехами', type: 'breakfast', diet: ['standard', 'vegetarian', 'vegan'], baseCals: 400, p: 15, f: 12, c: 58 },
  { id: 'm2', name: 'Яичница с беконом и тостом', type: 'breakfast', diet: ['standard', 'keto'], baseCals: 450, p: 25, f: 30, c: 20 },
  { id: 'm3', name: 'Сырники со сметаной', type: 'breakfast', diet: ['standard', 'vegetarian'], baseCals: 350, p: 20, f: 15, c: 33 },
  
  { id: 'm4', name: 'Куриная грудка с рисом и овощами', type: 'lunch', diet: ['standard'], baseCals: 500, p: 40, f: 10, c: 62 },
  { id: 'm5', name: 'Стейк из лосося с киноа', type: 'lunch', diet: ['standard', 'keto'], baseCals: 550, p: 35, f: 25, c: 46 },
  { id: 'm6', name: 'Тофу боул с бататом', type: 'lunch', diet: ['vegetarian', 'vegan'], baseCals: 450, p: 22, f: 18, c: 50 },

  { id: 'm7', name: 'Говяжий стейк с салатом', type: 'dinner', diet: ['standard', 'keto'], baseCals: 600, p: 50, f: 35, c: 20 },
  { id: 'm8', name: 'Паста с индейкой в томатном соусе', type: 'dinner', diet: ['standard'], baseCals: 550, p: 35, f: 15, c: 68 },
  { id: 'm9', name: 'Чечевичный суп', type: 'dinner', diet: ['vegetarian', 'vegan'], baseCals: 350, p: 18, f: 8, c: 51 },

  { id: 'm10', name: 'Греческий йогурт с медом', type: 'snack', diet: ['standard', 'vegetarian'], baseCals: 200, p: 15, f: 5, c: 24 },
  { id: 'm11', name: 'Горсть миндаля', type: 'snack', diet: ['standard', 'vegetarian', 'vegan', 'keto'], baseCals: 160, p: 6, f: 14, c: 6 },
  { id: 'm12', name: 'Протеиновый батончик', type: 'snack', diet: ['standard', 'vegetarian'], baseCals: 220, p: 20, f: 8, c: 20 },
];

// --- STORAGE MANAGER ---
const LocalStorageAdapter = {
  async getItem(k) { return window.miniappsAI?.storage ? await window.miniappsAI.storage.getItem(k) : localStorage.getItem(k); },
  async setItem(k, v) { return window.miniappsAI?.storage ? await window.miniappsAI.storage.setItem(k, v) : localStorage.setItem(k, v); },
  async removeItem(k) { return window.miniappsAI?.storage ? await window.miniappsAI.storage.removeItem(k) : localStorage.removeItem(k); }
};

const DataStore = {
  // User Profile
  async getUser() {
    const raw = await LocalStorageAdapter.getItem('ft_user');
    try { return raw ? JSON.parse(raw) : null; } catch(e) { return null; }
  },
  async saveUser(userObj) {
    await LocalStorageAdapter.setItem('ft_user', JSON.stringify(userObj));
  },
  async clearUser() {
    await LocalStorageAdapter.removeItem('ft_user');
    await LocalStorageAdapter.removeItem('ft_workout_plan');
    await LocalStorageAdapter.removeItem('ft_weights');
  },

  // Streaks Logic
  async updateStreak(user) {
    if (!user) return 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    let streak = user.streak || 0;
    const lastDate = user.lastActiveDate;

    if (lastDate === yesterday) {
      streak += 1;
    } else if (lastDate !== today) {
      streak = 1;
    }

    user.streak = streak;
    user.lastActiveDate = today;
    await this.saveUser(user);
    return streak;
  },

  // Custom Weights (Progressive Overload)
  async getCustomWeights() {
    const raw = await LocalStorageAdapter.getItem('ft_weights');
    try { return raw ? JSON.parse(raw) : {}; } catch(e) { return {}; }
  },
  async saveCustomWeights(weights) {
    await LocalStorageAdapter.setItem('ft_weights', JSON.stringify(weights));
  },

  // Workout Plan
  async getWorkoutPlan() {
    const raw = await LocalStorageAdapter.getItem('ft_workout_plan');
    try { return raw ? JSON.parse(raw) : null; } catch(e) { return null; }
  },
  async saveWorkoutPlan(plan) {
    await LocalStorageAdapter.setItem('ft_workout_plan', JSON.stringify(plan));
  },

  // Logs (Workouts done, weight tracked)
  async getLogs() {
    const raw = await LocalStorageAdapter.getItem('ft_logs');
    let parsed = { workouts: [], weight: [] };
    if (raw) {
      try {
        const data = JSON.parse(raw);
        if (data) {
          parsed.workouts = data.workouts || [];
          parsed.weight = data.weight || [];
        }
      } catch(e) {}
    }
    return parsed;
  },
  async saveLogs(logs) {
    await LocalStorageAdapter.setItem('ft_logs', JSON.stringify(logs));
  },
  async addWorkoutLog(workoutLog) {
    const logs = await this.getLogs();
    logs.workouts.push(workoutLog);
    await this.saveLogs(logs);
  },
  async addWeightLog(dateStr, weight) {
    const logs = await this.getLogs();
    logs.weight.push({ date: dateStr, weight: parseFloat(weight) });
    await this.saveLogs(logs);
    
    // Update user profile weight too
    const user = await this.getUser();
    if(user) {
      user.weight = parseFloat(weight);
      await this.saveUser(user);
    }
  },

  // Nutrition (Today's macros and meals)
  async getNutritionLog(dateStr) {
    const raw = await LocalStorageAdapter.getItem(`ft_nutri_${dateStr}`);
    try { return raw ? JSON.parse(raw) : { meals: [], totalCals: 0, totalPro: 0, totalCarb: 0, totalFat: 0 }; } catch(e) { return { meals: [], totalCals: 0, totalPro: 0, totalCarb: 0, totalFat: 0 }; }
  },
  async saveNutritionLog(dateStr, data) {
    await LocalStorageAdapter.setItem(`ft_nutri_${dateStr}`, JSON.stringify(data));
  },
  
  async getActivityLog(dateStr) {
    const raw = await LocalStorageAdapter.getItem(`ft_act_${dateStr}`);
    try { return raw ? JSON.parse(raw) : { water: 0, steps: 0, sleep: 0 }; } catch(e) { return { water: 0, steps: 0, sleep: 0 }; }
  },
  async saveActivityLog(dateStr, data) {
    await LocalStorageAdapter.setItem(`ft_act_${dateStr}`, JSON.stringify(data));
  },

  // Meal Plan (Generated per day)
  async getMealPlan(dateStr) {
    const raw = await LocalStorageAdapter.getItem(`ft_mealplan_${dateStr}`);
    try { return raw ? JSON.parse(raw) : null; } catch(e) { return null; }
  },
  async saveMealPlan(dateStr, plan) {
    await LocalStorageAdapter.setItem(`ft_mealplan_${dateStr}`, JSON.stringify(plan));
  },

  // Chat History
  async getChatHistory() {
    const raw = await LocalStorageAdapter.getItem('ft_chat');
    try { return raw ? JSON.parse(raw) : [
      { role: 'assistant', content: window.miniappI18n.t('data.chat_intro') }
    ]; } catch(e) { return [
      { role: 'assistant', content: window.miniappI18n.t('data.chat_intro') }
    ]; }
  },
  async saveChatHistory(history) {
    await LocalStorageAdapter.setItem('ft_chat', JSON.stringify(history));
  },
  async getMeasurements() {
    const raw = await LocalStorageAdapter.getItem('ft_measurements');
    try { return raw ? JSON.parse(raw) : { dates: [], chest: [], waist: [], hips: [], biceps: [] }; } catch(e) { return { dates: [], chest: [], waist: [], hips: [], biceps: [] }; }
  },
  async addMeasurement(dateStr, data) {
    const m = await this.getMeasurements();
    const idx = m.dates.indexOf(dateStr);
    if(idx > -1) {
      if(data.chest) m.chest[idx] = data.chest;
      if(data.waist) m.waist[idx] = data.waist;
      if(data.hips) m.hips[idx] = data.hips;
      if(data.biceps) m.biceps[idx] = data.biceps;
    } else {
      m.dates.push(dateStr);
      m.chest.push(data.chest || 0);
      m.waist.push(data.waist || 0);
      m.hips.push(data.hips || 0);
      m.biceps.push(data.biceps || 0);
    }
    await LocalStorageAdapter.setItem('ft_measurements', JSON.stringify(m));
  },
  async getRecipes() {
    const raw = await LocalStorageAdapter.getItem('ft_recipes');
    try { return raw ? JSON.parse(raw) : []; } catch(e) { return []; }
  },
  async saveRecipes(recipes) {
    await LocalStorageAdapter.setItem('ft_recipes', JSON.stringify(recipes));
  },
  async exportAll() {
    const keys = ['ft_user', 'ft_weights', 'ft_workout_plan', 'ft_logs', 'ft_measurements', 'ft_recipes', 'ft_chat'];
    const exp = {};
    for(let k of keys) {
       const val = await LocalStorageAdapter.getItem(k);
       if(val) exp[k] = JSON.parse(val);
    }
    return exp;
  },
  async importAll(data) {
    for(let k in data) {
       if(k.startsWith('ft_')) {
         await LocalStorageAdapter.setItem(k, JSON.stringify(data[k]));
       }
    }
  }
};

// --- LOGIC HELPERS ---
const Logic = {
  async estimateWeightsWithAI(user) {
    const exercises = getExercises().filter(e => e.equipment !== 'bodyweight' && e.id !== 18 && e.id !== 19);
    const expStr = user.experience === 'advanced' ? 'Продвинутый атлет' : (user.experience === 'intermediate' ? 'Средний уровень' : 'Новичок');
    const prompt = `Ты профессиональный фитнес-тренер. Оцени реалистичный стартовый рабочий вес (в кг) для 1-го подхода (на 10 повторений) базовых упражнений.\nДанные клиента: Пол: ${user.gender==='male'?'Мужчина':'Женщина'}, Возраст: ${user.age}, Вес тела: ${user.weight}кг, Цель: ${user.goal}.\nВерни ТОЛЬКО валидный JSON, где ключ - это ID упражнения (строка), а значение - вес в кг (число). Никакого текста.\nУпражнения:\n${exercises.map(e => `${e.id}: ${e.name} (${e.equipment})`).join('\n')}`;

    try {
      const result = await miniappsAI.callModel({
        modelId: "83980b26-79ba-4962-831f-8c1dc91a531a", // Gemini 2.5 Flash
        messages: [{role: 'user', content: prompt}]
      });
      const text = miniappsAI.extractText(result);
      const match = text.match(/\{[\s\S]*\}/);
      if(match) return JSON.parse(match[0]);
    } catch(e) {
      console.error("AI Weight estimation failed", e);
    }
    
    // Fallback if AI fails
    const fb = {};
    exercises.forEach(e => {
      if(e.equipment === 'barbell') fb[e.id] = user.gender === 'male' ? 30 : 15;
      else if(e.equipment === 'dumbbell') fb[e.id] = user.gender === 'male' ? 10 : 5;
      else fb[e.id] = user.gender === 'male' ? 20 : 10;
    });
    return fb;
  },

  async generateWorkoutPlan(user) {
    const exercises = getExercises();
    let availableIds = exercises.filter(ex => (user.equipment || ['bodyweight']).includes(ex.equipment)).map(ex => ex.id);
    if (availableIds.length < 3) availableIds = exercises.map(e => e.id); // fallback

    const plan = {
      name: user.goal === 'cut' ? window.miniappI18n.t('data.plan_cut') : window.miniappI18n.t('data.plan_bulk'),
      weeks: 12,
      daysPerWeek: parseInt(user.frequency) || 3,
      sessions: []
    };

    const customWeights = await DataStore.getCustomWeights();

    const buildSession = (dayName) => {
      let exs = this._pickRandomExercises(availableIds, 4).map(id => this._createExerciseLog(id, user, exercises, customWeights));
      // Add Warmup & Cooldown
      const warmup = this._createExerciseLog(18, user, exercises, customWeights);
      warmup.targetSets = 1; warmup.targetReps = '1';
      const cooldown = this._createExerciseLog(19, user, exercises, customWeights);
      cooldown.targetSets = 1; cooldown.targetReps = '1';
      return { dayName, exercises: [warmup, ...exs, cooldown] };
    };

    plan.sessions.push(buildSession(window.miniappI18n.t('data.workout_a')));
    if (plan.daysPerWeek >= 2) plan.sessions.push(buildSession(window.miniappI18n.t('data.workout_b')));
    if (plan.daysPerWeek >= 3) plan.sessions.push(buildSession(window.miniappI18n.t('data.workout_c')));

    return plan;
  },

  _pickRandomExercises(availableIds, count) {
    // Exclude special ids 18, 19 from random pick
    const validIds = availableIds.filter(id => id !== 18 && id !== 19);
    const shuffled = [...validIds].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  _createExerciseLog(exId, user, exercises, customWeights) {
    const ex = exercises.find(e => e.id === exId);
    let sets = user.goal === 'cut' ? 3 : 4;
    let reps = user.goal === 'cut' ? '12-15' : '8-10';
    
    // Resolve weight logic (custom > default)
    let weightLabel = '';
    let numericWeight = 0;
    
    if (ex.equipment === 'bodyweight') {
      weightLabel = window.miniappI18n.t('data.equipment_bodyweight');
    } else {
      if (customWeights[ex.id]) {
        numericWeight = customWeights[ex.id];
      } else {
        if (ex.equipment === 'machine') numericWeight = user.gender === 'male' ? 20 : 10;
        else numericWeight = user.gender === 'male' ? 10 : 5; // Barbell/Dumbbell
      }
      weightLabel = numericWeight + ' ' + window.miniappI18n.t('dashboard.kg');
    }
    
    return {
      id: ex.id,
      name: ex.name,
      emoji: ex.emoji,
      group: ex.group,
      equipment: ex.equipment,
      targetSets: sets,
      targetReps: reps,
      weight: weightLabel,
      numericWeight: numericWeight, // needed for calculations and progressive overload
      technique: ex.technique
    };
  },

  calculateTDEE(user) {
    if (!user) return 2000;
    let bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age;
    bmr += (user.gender === 'male') ? 5 : -161;
    
    let multiplier = 1.2;
    if (user.frequency === '3') multiplier = 1.375;
    if (user.frequency === '4' || user.frequency === '5') multiplier = 1.55;
    
    let tdee = Math.round(bmr * multiplier);
    
    if (user.goal === 'cut') tdee -= 400;
    if (user.goal === 'bulk') tdee += 300;
    
    return tdee;
  },

  calculateMacros(tdee, goal) {
    let pPct = 0.30, fPct = 0.30, cPct = 0.40;
    if (goal === 'cut') { pPct = 0.35; fPct = 0.25; cPct = 0.40; }
    else if (goal === 'bulk') { pPct = 0.25; fPct = 0.25; cPct = 0.50; }
    return {
      p: Math.round((tdee * pPct) / 4),
      f: Math.round((tdee * fPct) / 9),
      c: Math.round((tdee * cPct) / 4)
    };
  },

  generateMealPlan(user, dateStr) {
    const tdee = this.calculateTDEE(user);
    const targets = {
      breakfast: tdee * 0.25,
      lunch: tdee * 0.35,
      dinner: tdee * 0.30,
      snack: tdee * 0.10
    };

    const dietType = user.diet || 'standard';
    const meals = getMockMeals().filter(m => m.diet.includes(dietType));

    const pickAndScale = (type, targetCals) => {
      const options = meals.filter(m => m.type === type);
      const chosen = options[Math.floor(Math.random() * options.length)] || options[0];
      if (!chosen) return null;
      
      const ratio = targetCals / chosen.baseCals;
      return {
        id: chosen.id + '_' + Date.now() + Math.random().toString().slice(2, 6),
        baseId: chosen.id,
        name: chosen.name,
        type: type,
        cals: Math.round(chosen.baseCals * ratio),
        p: Math.round(chosen.p * ratio),
        f: Math.round(chosen.f * ratio),
        c: Math.round(chosen.c * ratio),
        eaten: false
      };
    };

    return {
      date: dateStr,
      items: [
        pickAndScale('breakfast', targets.breakfast),
        pickAndScale('lunch', targets.lunch),
        pickAndScale('dinner', targets.dinner),
        pickAndScale('snack', targets.snack)
      ].filter(Boolean)
    };
  },

  pickAlternativeMeal(oldItem, user) {
    const dietType = user.diet || 'standard';
    const meals = getMockMeals().filter(m => m.diet.includes(dietType) && m.type === oldItem.type && m.id !== oldItem.baseId);
    let chosen = meals[Math.floor(Math.random() * meals.length)];
    if (!chosen) chosen = getMockMeals().find(m => m.type === oldItem.type && m.id === oldItem.baseId); // fallback
    
    if(!chosen) return oldItem;

    const ratio = oldItem.cals / chosen.baseCals;
    return {
      ...oldItem,
      baseId: chosen.id,
      name: chosen.name,
      p: Math.round(chosen.p * ratio),
      f: Math.round(chosen.f * ratio),
      c: Math.round(chosen.c * ratio),
      eaten: false
    };
  }
};
