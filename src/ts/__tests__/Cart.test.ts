import Cart from '../service/Cart';
import Book from '../domain/Book';
import MusicAlbum from '../domain/MusicAlbum';
import Movie from '../domain/Movie';

const avengers = new Movie(
  1001,
  'Мстители',
  'The Avengers',
  500,
  2012,
  'США',
  '«Avengers Assemble!»',
  ['фантастика', 'боевик', 'фэнтези', 'приключения'],
  137,
  true,
);
const book = new Book(1, 'War and Peace', 'Leo Tolstoy', 2000, 1225);
const album = new MusicAlbum(2, 'Meteora', 'Linkin Park', 900);

test('new cart should be empty', () => {
  expect(new Cart().items.length).toBe(0);
});

test('movie can be added to cart', () => {
  const cart = new Cart();
  cart.add(avengers);
  expect(cart.items).toEqual([avengers]);
});

test('movie duration is formatted', () => {
  expect(avengers.duration).toBe('137 мин. / 02:17');
  expect(avengers.isImax).toBe(true);
});

test('movie is not IMAX by default', () => {
  const movie = new Movie(2, 'A', 'A', 1, 2000, 'X', '', [], 90);
  expect(movie.isImax).toBe(false);
});

test('items returns a copy', () => {
  const cart = new Cart();
  cart.add(book);
  cart.items.pop();
  expect(cart.items.length).toBe(1);
});

test('totalPrice sums all items', () => {
  const cart = new Cart();
  cart.add(book);
  cart.add(album);
  cart.add(avengers);
  expect(cart.totalPrice()).toBe(3400);
});

test('totalPrice of empty cart is 0', () => {
  expect(new Cart().totalPrice()).toBe(0);
});

test('totalPriceWithDiscount applies percent discount', () => {
  const cart = new Cart();
  cart.add(book);
  cart.add(album);
  expect(cart.totalPriceWithDiscount(10)).toBe(2610);
  expect(cart.totalPriceWithDiscount(0)).toBe(2900);
});

test('removeById removes only the item with given id', () => {
  const cart = new Cart();
  cart.add(book);
  cart.add(album);
  cart.removeById(1);
  expect(cart.items).toEqual([album]);
});

test('removeById with unknown id changes nothing', () => {
  const cart = new Cart();
  cart.add(book);
  cart.removeById(999);
  expect(cart.items).toEqual([book]);
});
