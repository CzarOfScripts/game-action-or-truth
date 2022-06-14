const randomInt    = (min, max) => Math.floor(Math.random() * (max - min) + min);
const shuffleArray = (array) =>
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};


class Game
{
	static #VARIATIONS = ['truth', 'action'];

	#itemCount;
	#root;
	#tablet;
	#actionList;
	#truthList;

	constructor(root, itemCount = 13)
	{
		this.#root = root;
		this.#itemCount = itemCount;

		this.#loadActionAndTruth();
		this.#init();
	}

	#init()
	{
		this.#tablet = document.createElement('div');
		this.#tablet.classList.add('tablet');

		for (let i = 0; i < this.#itemCount; i++)
		{
			const item = this.#createItem()
			this.#tablet.append(item);
		}

		this.#tablet.addEventListener('click', this.#itemHandlerClick.bind(this));

		this.#root.append(this.#tablet);
	}

	#createItem()
	{
		const item = document.createElement('div');
		item.classList.add('tablet__item');
		item.innerHTML = '<img src="./img/what.png" class="tablet__image" alt="What?">';

		return item;
	}

	#itemHandlerClick({target})
	{
		const item = target.closest('.tablet__item');
		if (item === null)
		{
			return;
		}

		const classList = item.classList;
		if (classList.contains('tablet__item--variation-truth') || classList.contains('tablet__item--variation-action'))
		{
			return;
		}

		const variation = this.#getRandomVariation();
		this.#changeItemVariation(item, variation);

		item.textContent = (variation === 'truth' ? this.#getTruth() : this.#getAction());
	}

	#changeItemVariation(item, variation)
	{
		item.classList.add('tablet__item--variation-' +variation);
	}

	#getRandomVariation()
	{
		const num = randomInt(0, 100) % 2;

		return Game.#VARIATIONS[num];
	}

	#getAction()
	{
		const listItemIndex = this.#actionList.findIndex(({show}) => show === false);
		this.#actionList[listItemIndex].show = true;

		return this.#actionList[listItemIndex].text;
	}

	#getTruth()
	{
		const listItemIndex = this.#truthList.findIndex(({show}) => show === false);
		this.#truthList[listItemIndex].show = true;

		return this.#truthList[listItemIndex].text;
	}

	#loadActionAndTruth()
	{
		this.#actionList =
		[
			'Помаши незнакомцу на дороге.',
			'Пой как оперный певец.',
			'Ковыряйся в носу на публике.',
			'Выйди на улицу и громко спой гимн.',
			'Подражай своему любимому персонажу Диснея.',
			'Позвони своему крашу, чтобы признаться в любви.',
			'Поцелуй подошву обуви друга.',
			'Лизни переднюю шину велосипеда.',
			'Начни прямую трансляцию в ВК/Инстаграме и расскажи людям глупую шутку.',
			'Съешь кусок бумаги.',
			'Съешь ложку маринада.',
			'Обними дерево и поцелуй его листья.',
			'Попроси соседа чашку кофе.',
			'Попробуй издать звук голодной собаки.',
			'Соси свой большой палец пятнадцать минут.',
			'Позвони маме и скажи ей, как сильно ты любишь курить сигареты.',
			'Пусть люди бросают тебе яйца в лицо.',
			'Позвони своему отцу и скажи ему, что у тебя есть парень / девушка.',
			'Позируй как модель Victoria Secret.',
			'Говори со своей рукой в течение следующих десяти минут.',
			'Сделай 20 отжиманий.',
			'Понюхай подмышки человека, сидящего справа от тебя.',
			'Позвони на случайный номер и спой колыбельную.',
			'Съешь ложку сахара.',
			'Остальную часть игры играй стоя.',
			'Надень свой бюстгальтер поверх своей рубашки до конца игры.',
			'Имитируй свою маму.',
			'Позвони какому-нибудь случайному человеку и скажи ему «С Днем Рождения».',
			'Позвони любимому человеку и сделай ему / ей предложение.',
			'Позвони в пиццерию и закажи пиццу на всех, кто в комнате.',
			'Позвони своему учителю и признайся, что ты жульничал(а) на последней контрольной.',
			'Носи свое нижнее белье на голове до конца игры.',
			'Сделай забавное селфи и отправь маме.',
			'Тепло обними человека, сидящего справа.',
			'Пусть все заглянут в твою историю поиска в твоем телефоне.',
			'Позвони своей маме с сексуальным голосом.',
			'Попроси человека справа потянуть тебя за щеки.',
			'Обменяйся нижним бельем с человеком, сидящем рядом с тобой.',
			'Почисти зубы человека, сидящего слева.',
			'Закажи кольцо онлайн и подари маме.',
			'Позвони в дверь соседей и убеги.',
			'Сделай лунную походку.',
			'Побрей подмышки.',
			'Откуси ноготь зубами.',
			'Пофлиртуй со случайным парнем на дороге.',
			'Издай смешные, пердящие звуки.',
			'Поцелуй любого человека из группы твоих друзей.',
			'Нарисуй татуировку на правой руке перманентным маркером.',
			'Прими холодный душ в одежде и проведи остаток игры в мокрой одежде.',
			'Говори голосом утки.',
			'Найди видео с порно и посмотри его.',
			'Съешь горсть порошка специй.',
			'Наклейте восковую полоску на спину любого человека и сдерните ее.',
			'Понюхай черный перец, не чихая.',
			'До конца игры будь с закрытыми глазами.',
			'Смешай сахар и черный перец и съешь.',
			'Натри нос шоколадом и попробуй это слизать.',
			'Опубликуй статус в ВК, используя только локти.',
			'Положи кубики льда себе в обувь и не снимай до конца игры.',
			'Полижи локоть.',
			'Подражай своему домашнему питомцу.',
			'Выпей десять стаканов воды за один присест.',
			'Купи рубашку в Интернете и подари ее отцу.'
		];

		this.#truthList =
		[
			'Самая большая ложь, которую кто-то сказал тебе в детстве?',
			'За кого бы ты хотела выйти замуж/ на ком жениться?',
			'У тебя был воображаемый друг в детстве?',
			'Назови три вещи, о которых ты думаешь, сидя на унитазе.',
			'Имя твоего парня / девушки?',
			'Назови последнее, что ты искал(а) в Google.',
			'Ты любишь петь в душе?',
			'Ты испытал(а) любовь и чувство любви?',
			'Какую суперспособность ты бы хотел(а)?',
			'Ты когда-нибудь делал предложение руки и сердца кому-то?',
			'Расскажи свой самый неловкий секрет.',
			'Кто твой лучший друг?',
			'Назови любого/любую из своих друзей, с кем бы ты хотел(а) поужинать при свечах.',
			'Какую самую большую ложь ты кому-то сказал(а)?',
			'Назови любую из своих худших привычек, от которой ты хочешь избавиться.',
			'Кто самый симпатичный мальчик или девочка в твоем классе?',
			'Кого ты любишь больше всего? Маму или папу?',
			'Тебя когда-нибудь ловили на том, что ты разговариваешь во сне?',
			'Девушка / парень твоей мечты?',
			'Назови свой самый большой страх.',
			'Ты когда-нибудь случайно видел(а), как твои родители занимаются сексом?',
			'Ты когда-нибудь ковырялась/ковырялся в носу на публике?',
			'Назови свою нынешнюю любовь.',
			'Назови свою детскую любовь.',
			'Ты когда-нибудь был(а) влюблен(а) в своего учителя/учительницу?',
			'Ты когда-нибудь целовал(а) свою фотографию?',
			'Тебя когда-нибудь ловили на том, что ты ходишь во время сна?',
			'Ты когда-нибудь хотел(а) кого-то убить?',
			'Персонаж Диснея, которым бы ты хотел(а) стать?',
			'Какой твой размер бюстгальтера?',
			'Ты когда-нибудь пробовал(а) флиртовать с девушкой лучшего друга/парнем лучшей подруги?',
			'Назови любую знаменитость, которую ты считаешь самой горячей.',
			'Сколько ты весишь?',
			'Если у тебя когда-нибудь появится шанс жениться на знаменитости, кто бы это был?',
			'Опиши самую смешную шутку, которую кто-то проделал над тобой?',
			'Тебе нравится облизывать тарелку после того, как ты закончишь есть?',
			'Ты когда-нибудь пробовал(а) корм для кошек или собак?',
			'Каким был твой ник в детстве?',
			'Какую прическу ты всегда хотел(а) иметь?',
			'Назови животное, которое больше всего на тебя похоже.',
			'О какой карьерной позиции ты мечтаешь?',
			'Что ты замечаешь в девушке или в парне в первую очередь?',
			'Что тебе нравится больше? Чай или кофе?',
			'Ты считаешь себя сексуальным/сексуальной?',
			'Ты когда-нибудь плакал(а) из-за того, что скучаешь по кому-то?',
			'Ты когда-нибудь просил(а) кого-нибудь пойти с тобой на свидание?',
			'Когда ты в последний раз плакал(а) и почему?',
			'Ты танцуешь в одиночестве?',
			'Назови любую часть своего тела, которую бы ты хотел(а) обменять со своим лучшим другом/подругой.',
			'Назови одну вещь, которую ты хочешь изменить в себе.',
			'Кто из людей в этой комнате целуется хуже всего?',
			'Кому ты завидуешь?',
			'Расскажи о своей талии.',
			'Ты когда-нибудь хотел(а) изменить свой пол?',
			'О какой работе ты мечтаешь?',
			'Что самое бесполезное, что ты знаешь?',
			'Назови человека в этой комнате, в кого ты тайно влюблен(а).',
			'Что написано на последней странице твоего дневника?',
			'Опиши свое первое впечатление о своём парне или девушке.',
			'Ты когда-нибудь себе оставил(а) книгу из библиотеки намеренно?'
		];

		const formatList = (text) =>
		{
			return {text, show: false};
		};

		shuffleArray(this.#actionList);
		shuffleArray(this.#truthList);

		this.#actionList = this.#actionList.map(formatList);
		this.#truthList = this.#truthList.map(formatList);
	}
}

const game = new Game(document.querySelector('.game'));
