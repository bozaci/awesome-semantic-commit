<p align="center">
   <img src="docs/images/banner-tr.svg" alt="Semantic Commit Banner" />
</p>

<p align="center">
   <a href="README.md">
      <img src="https://img.shields.io/badge/Dil-İngilizce-637AFA" />
   </a>
   <img src="https://img.shields.io/badge/Dil-Türkçe-lightgray" />
</p>

<p align="center">
  <a href="https://semanticcommit.com?utm_source=github&utm_medium=website-text&utm_campaign=analysis">Website</a>
  ·
  <a href="https://semanticcommit.com/commit-generator?utm_source=github&utm_medium=commit-generator-text&utm_campaign=analysis">Commit Oluşturucu</a>
  ·
  <a href="https://twitter.com/yusufbozaci_">Twitter'dan Takip Et</a>
  <br />
  <a href="README_APP.md">Geliştiriciler için Dokümantasyon</a>
</p>

# Awesome Semantic Commit [![Awesome](https://awesome.re/badge-flat2.svg)](https://awesome.re)

> Düzenli commit mesajları için rehber

Semantic Commit, yazılım geliştirmede kullanılan bir yöntemdir. Temel amacı, commit mesajlarının (yani kodda yapılan her değişikliğe ilişkin mesajların) daha anlamlı ve yapılandırılmış olmasını sağlamaktır. Bu sayede geliştiriciler, kodda hangi değişikliklerin, neden ve ne zaman yapıldığını daha kolay anlayabilirler.

## İçindekiler

- [Neden Önemli?](#neden-önemli)
- [Commit Mesajı Yapısı](#commit-mesaj-yapısı)
- [Nasıl Kullanılır?](#nasıl-kullanılır)
- [Nasıl Kullanılmaz?](#nasıl-kullanılmaz)
- [Sıkça Sorulan Sorular](#sıkça-sorulan-sorular)
- [Katkı Sağlama](#katkı-sağlama)

## Neden Önemli?

<b>Kolayca Anlaşılabilir Değişiklikler</b><br /> Her commit mesajı yapılan değişiklikleri açıkça tanımlar. Böylece, bir projede çalışırken kodda neyin, neden değiştirildiğini hızlıca anlayabilirsiniz. Örneğin, 'sadece bazı düzenlemeler yapıldı' demek yerine, 'yeni giriş sayfası eklendi' gibi net bir açıklama yapılır.

<b>Daha Hızlı Sorun Çözme</b><br /> Bir projede hata olduğunda, bu hatayı neden olan değişiklikleri bulmak commit mesajlarını incelemekle çok daha kolay hale gelir. Anlamlı ve yapılandırılmış commit mesajları, hataları hızlıca tespit etmeye yardımcı olur.

<b>Sürüm Takibi</b><br /> Semantic Commit, hangi değişikliklerin hangi sürümde yapıldığını daha açık bir şekilde görmenizi sağlar. Örneğin, yeni bir özellik eklendiğinde sürüm numarası güncellenebilir. Bu, projenin güncel kalmasını kolaylaştırır.

<b>Takım Çalışması</b><br /> Birden fazla kişiyle çalışırken, herkesin commit mesajlarını aynı şekilde yazması projeyi düzenli tutar. Böylece bir takım üyesi, diğerinin ne yaptığını daha kolay anlayabilir ve işbirliği artar.

<b>Proje Yönetimini Kolaylaştırma</b><br /> Proje büyüdükçe yüzlerce hatta binlerce commit olabilir. Anlamlı commit mesajları, büyük projeyi yönetmeyi ve zamanla yapılan değişiklikleri takip etmeyi kolaylaştırır.

## Commit Mesajı Yapısı

Semantic Commit mesajları belirli bir kurala göre yazılır. Bu kurallar, her commit mesajının anlamlı ve tutarlı olmasını sağlar.

### 1. Tür (Type)

Bu, yapılan değişikliğin ne türde olduğunu belirtir. Commit mesajının başına eklenir, sık kullanılan commit türleri:

- `feat`: Yeni bir özellik eklendiğinde kullanılır.
- `fix`: Bir hatanın düzeltildiğini belirtir.
- `docs`: Sadece belgelendirme ile ilgili değişiklikler yapılmışsa kullanılır.
- `style`: Kodun işlevini değiştirmeyen, yalnızca formatlama ile ilgili değişiklikler (örneğin, boşluk veya noktalama düzeltmeleri).
- `chore`: Kod veya bağımlılıklar üzerinde yapılan işlevsel olmayan değişikliklerdir. Örneğin, paket güncellemeleri veya derleme yapılandırmalarındaki değişiklikler.
- `refactor`: Kodun işlevini değiştirmeden yapısını yeniden düzenlemek için kullanılır.
- `test`: Test eklemek veya güncellemek için kullanılır.
- `perf`: Yazılımda işlevselliği değiştirmeden, yalnızca performansı artırmak amacıyla yapılan değişiklikler için kullanılır. Bu commit türü, kodun daha hızlı çalışmasını sağlamak, kaynak tüketimini azaltmak veya verimliliği artırmak gibi iyileştirmeleri içerir.
- `ci`: Sürekli entegrasyon yapılandırması ile ilgili değişikliklerde kullanılır. Örneğin, CI/CD pipeline değişiklikleri.
- `build`: Yapı sistemiyle ilgili yapılan değişiklikler için kullanılır. Örneğin, derleme ayarları veya bağımlılık yönetimi.
- `revert`: Önceki bir commit'in etkilerini geri alır.

### 2. Kapsam (Scope) - isteğe bağlı

Değişikliğin hangi modül, dosya veya bileşen üzerinde yapıldığını belirtir. Tür ile birlikte parantez içinde yazılır.

Örnekler:

- `feat(auth)`, `fix(ui)`, `docs(readme)`, `style(header)`, `chore(deps)`, `refactor(api)`, `test(login)`, `perf(image-loader)`, `ci(travis)`, `build(webpack)`, `revert(api)`

### 3. Konu (Subject)

Commit'in ne yaptığını kısa ve öz bir şekilde açıklar. Maksimum 50 karakter olacak şekilde yazılmalıdır.

Örnekler:

- `feat(auth): add login functionality`
- `fix(ui): resolve button alignment issue`
- `docs(readme): update installation instructions`
- `style(header): fix indentation`
- `chore(deps): update axios to v0.21.1`
- `refactor(api): optimize fetch method`
- `test(login): add unit tests for login function`
- `perf(image-loader): optimize image loading for faster page speed`
- `ci(travis): add deployment step to pipeline`
- `build(webpack): update webpack configuration for faster builds`
- `revert(api): revert API changes that caused issues with data fetching`

## Nasıl Kullanılır?

Bu bölümde, sürüm kontrolünde netlik sağlamak için semantik commit mesajı uygulamalarının nasıl uygulanacağı ve takip edileceği açıklanmaktadır.

### 1. 1. Değişiklikleri Ekleme (Staging)

İlk olarak, üzerinde çalıştığınız dosyalarda değişiklik yaptıktan sonra bu dosyaları commit'e dahil etmek için terminal üzerinden `git add` komutunu kullanmanız gerekir.

Tüm dosyaları eklemek için terminale şu komutu yazın:

```bash
git add .
```

Yalnızca belirli dosyaları eklemek isterseniz:

```bash
git add <dosya-adi>
```

### 2. Commit Yapma

Yapılan değişiklikleri commit etmek için terminal üzerinden şu komutu kullanabilirsiniz:

```bash
git commit -m "<commit-mesajı>"
```

Semantic Commit kurallarına uygun bir şekilde “commit-mesajı” yazarken dikkat etmeniz gerekenler:

- **Commit Türü**: Yapılan değişikliğin türünü belirtin (örneğin feat, fix, docs, vb.).
- **Kapsam (isteğe bağlı)**: Hangi modül veya bileşende değişiklik yapıldığını belirtmek için kapsam kullanabilirsiniz.
- **Mesajın Başlığı**: Kısa ve öz bir şekilde yapılan değişikliği açıklayın.

Örnek commit:

```bash
git commit -m "feat(auth): add user login functionality"
```

### 3. Commit'i Gönderme (Push)

Commit yaptıktanCommit yaptıktan sonra, değişikliklerinizi uzaktaki (remote) repository'e göndermek için terminal üzerinden şu komutu kullanabilirsiniz:

```bash
git push origin <branch-adı>
```

Örneğin, main veya dev branch’ine gönderim yapıyorsanız:

```bash
git push origin main
```

## Nasıl Kullanılmaz?

Bu, taahhüt mesajlarındaki yaygın hataları veya yanlış kullanımları özetleyerek kullanıcıların kafa karışıklığı veya tutarsızlıktan kaçınmasına yardımcı olur.

### 1. Commit Mesajlarında Türkçe Kullanımı Yanlıştır

Peki, neden? Yazılım dünyasında İngilizce, global (evrensel) bir dil olarak kabul edilmektedir. Farklı ülkelerden yazılımcılar ve ekipler, kodlama sırasında ve commit mesajlarında İngilizce kullanarak iletişim kurar. Bu nedenle commit mesajlarının da İngilizce olması gerekir.

Türkçe veya diğer dillerde yazılmış commit mesajları, uluslararası ekiplerde veya açık kaynak projelerinde çalışan kişiler için kafa karıştırıcı olabilir ve işbirliğini zorlaştırabilir.

<b>❌ Yanlış Kullanım:</b><br />
`eklenen özellik`, `güncellenen sayfa`, `değiştirilen kod`
<br /><br />
<b>✅ Doğru Kullanım</b><br />
`feat: add new search feature`, `fix: update login page`, `refactor: improve validation logic`

### 2. Neden added, updated, changed Gibi Kelimeleri Kullanmayalım?

Commit türlerini (type) belirtmek için bu kelimelere gerek yoktur, çünkü commit türleri zaten bu anlamı taşır. feat, fix, refactor gibi commit türleri, yapılacak değişikliklerin amacını zaten belirtir, bu yüzden tekrar "added", "updated", "changed" gibi kelimeleri kullanmaya gerek yoktur.

<b>❌ Yanlış Kullanım</b><br />
`feat: added new button`, `fix: updated validation`, `refactor: changed structure`
<br /><br />
<b>✅ Doğru Kullanım</b><br />
`feat: add new button`, `fix: improve validation logi`, `refactor: change component structure`

### 3. Yanlış Tür Kullanımı

Commit mesajında, yapılan değişikliğin türüne uygun olmayan bir etiketin kullanılmasıdır. Her tür, belirli bir amaca hizmet eder ve yanlış tür kullanımı, değişikliklerin ne amaçla yapıldığını belirsiz hale getirebilir. Bu durum, proje ekibinin değişiklikleri takip etmesini zorlaştırır ve kodun yönetimini karmaşıklaştırabilir.

<b>❌ Yanlış Kullanım</b><br />
`fix: add user authentication`, `feat: fix payment gateway issue`, `fix: optimize the code`
<br /><br />
<b>✅ Doğru Kullanım</b><br />
`feat: add user authentication`, `fix: payment gateway issue`, `refactor: optimize the code`

### 4. Gereksiz Büyük Harfler veya Özel Karakterler Kullanımı

Commit mesajlarında yanlışlıkla ya da kasıtlı olarak büyük harfler ya da özel karakterler kullanarak, mesajların okunabilirliğini ve tutarlılığını bozma durumudur. Bu tür kullanım, commit mesajlarının profesyonel ve standartlara uygun olmaktan çıkmasına neden olabilir.

<b>❌ Yanlış Kullanım</b><br />
`FEAT: NEW LOGIN SYSTEM IMPLEMENTED!!!`, `FIX: NULL POINTER EXCEPTION FIXED`, `REFACTOR: IMPROVED CODE PERFORMANCE!!!`
<br /><br />
<b>✅ Doğru Kullanım</b><br />
`feat: implement new login system`, `fix: resolve null pointer exception`, `refactor: improve code performance`

## Sıkça Sorulan Sorular

### Faydaları nelerdir?

1. **Anlaşılabilirlik**: Her commit mesajı, değişikliğin amacını ve neden yapıldığını açıkça belirtir. Örneğin, "feat: Yeni kullanıcı girişi sayfası eklendi" gibi bir mesaj, bu commit'in yeni bir özellik eklemek için yapıldığını belirtir.

2. **Kodun Geçmişini Takip Etmek**: Bir proje üzerinde çok sayıda geliştirici çalışıyorsa, her commit mesajı projenin geçmişini daha şeffaf ve takip edilebilir hale getirir. Hangi değişikliğin ne zaman yapıldığını bilmek, hataları bulmak ve düzeltmek için oldukça faydalıdır.

3. **Sürümleme (Versioning) ve Otomasyon**: Semantic commit mesajları, otomatik sürüm güncellemelerini (örneğin, yeni özellik ekleme, hata düzeltme gibi) yapmaya yardımcı olabilir. Bu mesajlar sayesinde projelerde sürüm numaraları düzenli bir şekilde artırılabilir (örneğin, 1.2.0 → 1.3.0).

### Commit türleri nasıl seçilir?

Her commit mesajı, yapılan değişikliğin amacını net bir şekilde ifade etmelidir. Bu, projede çalışan diğer geliştiricilerin değişikliklerin ne amaçla yapıldığını kolayca anlamasına yardımcı olur. İyi bir commit mesajı, sadece 'bug fix' veya 'feature update' gibi genel ifadelerden kaçınarak, yapılan değişikliğin nedenini ve neyi iyileştirdiğini açıkça belirtir. Ayrıca, commit mesajlarının kısa ve öz olmasına dikkat edilmelidir. Gerekirse daha detaylı açıklamalar için commit'in arkasına ek açıklamalar ya da referanslar eklenebilir.

### Kapsam zorunlu mu?

Hayır, kapsam (scope) zorunlu değildir. Kapsam, commit mesajında yapılan değişikliğin hangi bölümü ya da modülü etkilediğini belirtmek için isteğe bağlıdır. Ancak, büyük projelerde veya birden fazla modülün bulunduğu durumlarda kapsam kullanmak, yapılan değişikliğin hangi alanı etkilediğini daha net gösterebilir ve mesajı daha anlamlı hale getirebilir.

### Bir commit’i nasıl geri alırım?

Bir commit’i geri almak için birkaç farklı yöntem kullanabilirsiniz:

Son commit’i geri almak (soft reset):

`git reset --soft HEAD~1`

- Bu komut, son commit’i geri alır ama değişiklikleri çalışma alanınıza bırakır.

Son commit’i tamamen geri almak (hard reset):

`git reset --hard HEAD~1`

- Bu komut, hem commit’i hem de değişiklikleri tamamen siler.

git revert komutu kullanarak geri almak:

`git revert`

- Bu komut, istediğiniz commit’i geri alır ve yeni bir commit oluşturur.

### Kurallara uymadım, ne yapmalıyım?

Commit’i geri alabilirsiniz. "Bir commit’i nasıl geri alırım?" başlığına bakarak daha detaylı bilgiye ulaşabilirsiniz.

### Commit mesajları İngilizce mi olmalı?

Evet, commit mesajları global bir dil olan İngilizce olmalıdır. Bu, projede çalışan tüm geliştiriciler için anlaşılabilirliği artırır ve açık kaynak projelerinde uluslararası işbirliğini kolaylaştırır.

## Dipnotlar

Belgede tartışılan belirli noktalar için ek referanslar veya açıklamalar sağlar.

### Kaynaklar

Aşağıdaki kaynaklardan yararlanılmış olup, bunların üzerine eklenen yeni fikirler ve geliştirmeler de yapılmıştır:

- [Semantic Git Commit Messages - Gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
- [Semantic Commit Messages - Medium](https://callmeryan.medium.com/semantic-commit-messages-bcd60f75de1f)

## Katkı Sağlama

Daha fazla bilgi için [CONTRIBUTING.md](CONTRIBUTING.md) dosyasına bakabilirsiniz.
