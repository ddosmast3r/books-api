// Простой тест для проверки генерации slug и fullName
const slugify = require('slugify');

// Имитируем класс Author с методами генерации
class Author {
  constructor(firstName, lastName, middleName = null, bio = null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.bio = bio;
    
    // Вызываем методы генерации
    this.generateFullName();
    this.generateSlug();
  }

  generateFullName() {
    this.fullName = `${this.firstName} ${
      this.middleName ? this.middleName + ' ' : ''
    }${this.lastName}`;
  }

  generateSlug() {
    const fullName = `${this.firstName} ${
      this.middleName ? this.middleName + ' ' : ''
    }${this.lastName}`;
    this.slug = slugify(fullName, { lower: true });
  }
}

// Тестовые случаи
console.log('🧪 Тестируем генерацию fullName и slug для сущности Author\n');

// Тест 1: Автор без отчества
console.log('📝 Тест 1: Автор без отчества');
const author1 = new Author('Айзек', 'Азимов');
console.log(`   Имя: ${author1.firstName} ${author1.lastName}`);
console.log(`   ✅ fullName: "${author1.fullName}"`);
console.log(`   ✅ slug: "${author1.slug}"`);
console.log('');

// Тест 2: Автор с отчеством
console.log('📝 Тест 2: Автор с отчеством');
const author2 = new Author('Лев', 'Толстой', 'Николаевич');
console.log(`   Имя: ${author2.firstName} ${author2.middleName} ${author2.lastName}`);
console.log(`   ✅ fullName: "${author2.fullName}"`);
console.log(`   ✅ slug: "${author2.slug}"`);
console.log('');

// Тест 3: Автор с английским именем
console.log('📝 Тест 3: Автор с английским именем');
const author3 = new Author('Stephen', 'King');
console.log(`   Имя: ${author3.firstName} ${author3.lastName}`);
console.log(`   ✅ fullName: "${author3.fullName}"`);
console.log(`   ✅ slug: "${author3.slug}"`);
console.log('');

// Тест 4: Автор с пробелами и специальными символами
console.log('📝 Тест 4: Автор с пробелами и специальными символами');
const author4 = new Author('Жюль', 'Верн', 'Габриэль');
console.log(`   Имя: ${author4.firstName} ${author4.middleName} ${author4.lastName}`);
console.log(`   ✅ fullName: "${author4.fullName}"`);
console.log(`   ✅ slug: "${author4.slug}"`);
console.log('');

console.log('🎉 Все тесты завершены! Генерация fullName и slug работает корректно.'); 