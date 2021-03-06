import { shuffleArray } from '../utils/shuffleArray.utils.js';
import { IItemList } from '../interface/IItemList.interface';

export class Game
{
	#itemCount: number;
	#root: HTMLDivElement;
	#tablet: HTMLDivElement;
	#modal: HTMLDivElement;
	#modalCard: {card:HTMLDivElement, front:HTMLDivElement, back:HTMLDivElement};
	#list: IItemList[];

	public constructor(root: HTMLDivElement | null, itemLimit: number = 0)
	{
		if (root === null)
		{
			throw 'root is null!';
		}

		this.#root = root;
		this.#loadActionAndTruth();

		this.#itemCount = (itemLimit ? Math.min(this.#list.length, itemLimit) : this.#list.length);
	}

	public init(): void
	{
		this.#tablet = document.createElement('div');
		this.#tablet.classList.add('tablet');

		for (let i: number = 0; i < this.#itemCount; i++)
		{
			const item: HTMLDivElement = this.#createCard()
			this.#tablet.append(item);
		}

		this.#tablet.addEventListener('click', this.#cardHandlerClick.bind(this));

		this.#modal = this.#createModal();
		this.#modal.addEventListener('click', this.#modalHandlerClick.bind(this));

		this.#root.append(this.#tablet, this.#modal);
	}

	#createModal(): HTMLDivElement
	{
		const modal = document.createElement('div');
		modal.classList.add('modal');

		const card: HTMLDivElement = document.createElement('div');
		card.classList.add('card', 'modal__card');

		const cardFront: HTMLDivElement = document.createElement('div');
		cardFront.classList.add('card__front');
		cardFront.innerHTML = '<img src="./img/what.png" class="card__image" alt="What?">'

		const cardBack: HTMLDivElement = document.createElement('div');
		cardBack.classList.add('card__back');

		card.append(cardFront, cardBack);
		modal.append(card);

		this.#modalCard = {card: card, front: cardFront, back: cardBack};

		return modal;
	}

	#createCard(): HTMLDivElement
	{
		const item: HTMLDivElement = document.createElement('div');
		item.classList.add('tablet__item', 'card');
		item.innerHTML = `
			<div class="card__front">
				<img src="./img/what.png" class="card__image" alt="What?">
			</div>
			<div class="card__back"></div>
		`;

		return item;
	}

	#modalHandlerClick({target}: {target: HTMLDivElement}): void
	{
		if (target.closest('.modal__card') !== null)
		{
			return;
		}

		this.#modal.classList.remove('modal--show');
		this.#modalCard.back.textContent = '';

		this.#modalCard.card.classList.remove('card--variation-action', 'card--variation-truth', 'card--rotate');
	}

	#cardHandlerClick({target}: {target: HTMLDivElement}): void
	{
		const card: HTMLDivElement | null = target.closest('.tablet__item');
		if (card === null)
		{
			return;
		}

		const classList: DOMTokenList = card.classList;
		if (classList.contains('card--variation-truth') || classList.contains('card--variation-action'))
		{
			return;
		}

		const cardText: HTMLDivElement | null = card.querySelector('.card__back');
		if (cardText == null)
		{
			return;
		}

		const item: IItemList = this.#getListItem();

		this.#modalCard.back.textContent = item.text;
		cardText.textContent = item.text;

		this.#changeItemVariation(card, item.type);

		this.#modal.classList.add('modal--show');
		window.requestAnimationFrame(() => this.#changeItemVariation(this.#modalCard.card, item.type));
	}

	#changeItemVariation(item: HTMLDivElement, variation: string): void
	{
		item.classList.add('card--variation-' +variation, 'card--rotate');
	}

	#getListItem(): IItemList
	{
		const listItemIndex: number = this.#list.findIndex(this.#isNotShowItem);
		this.#list[listItemIndex].show = true;

		return this.#list[listItemIndex];
	}

	#loadActionAndTruth(): void
	{
		const actionList: string[] =
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
		const truthList: string[] =
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

		const actions: IItemList[] = actionList.map(this.#formatList.bind(null, 'action'));
		const truths: IItemList[] = truthList.map(this.#formatList.bind(null, 'truth'));

		this.#list = [...actions, ...truths];
		shuffleArray(this.#list);
	}

	#isNotShowItem({show}: IItemList): boolean
	{
		return show === false;
	}

	#formatList(type: 'truth' | 'action', text: string): IItemList
	{
		return {text, show: false, type};
	}
}
