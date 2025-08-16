# Инструкция для работы с git в проекте

## Основные команды

1. **Проверить статус изменений**
      ```bash
      git status
      ```
2. **Добавить файл/папку в индекс**
      ```bash
      git add <имя_файла_или_папки>
      ```
3. **Сделать коммит**
      ```bash
      git commit -m "Описание изменений"
      ```
4. **Отправить коммиты на сервер**
      ```bash
      git push
      ```

---

## Игнорирование временных и лишних файлов

1. Все временные и служебные файлы/папки должны быть прописаны в `.gitignore`.
2. После добавления новых правил в `.gitignore` (например, `node_modules/`, `build/`, `Отправка/` и др.), удалите эти файлы из индекса git (чтобы git перестал их отслеживать):

      ```bash
      git rm -r --cached <путь_к_папке_или_файлу>
      ```

      Например:

      ```bash
      git rm -r --cached node_modules
      git rm -r --cached build
      git rm -r --cached Отправка
      ```

3. Сделайте коммит и push:

      ```bash
      git add .gitignore
      git commit -m "Обновил .gitignore, убрал временные файлы из индекса"
      git push
      ```

---

## Если при push появляется ошибка про большой файл (>100MB)

**Ошибка (пример):**

```
remote: error: File ... is 129.17 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected.
! [remote rejected]   main -> main (pre-receive hook declined)
error: failed to push some refs ...
```

**Решение:**

1. Найдите путь к большому файлу из текста ошибки (например, `project-root/frontend/node_modules/.cache/default-development/3.pack`).
2. Удалите файл из истории git:

      ```bash
      git filter-branch --force --index-filter "git rm --cached --ignore-unmatch <путь_к_файлу>" --prune-empty --tag-name-filter cat -- --all
      ```

      Например:

      ```bash
      git filter-branch --force --index-filter "git rm --cached --ignore-unmatch project-root/frontend/node_modules/.cache/default-development/3.pack" --prune-empty --tag-name-filter cat -- --all
      ```

3. Очистите и сожмите репозиторий:

      ```bash
      git reflog expire --expire=now --all
      git gc --prune=now --aggressive
      ```

4. Сделайте форсированный push:

      ```bash
      git push --force
      ```

5. Проверьте статус:

      ```bash
      git status
      ```

---

## Важно!

- После удаления больших файлов из истории git другим участникам проекта нужно будет заново клонировать репозиторий или выполнить:
     ```bash
     git fetch origin
     git reset --hard origin/main
     ```
- **.gitignore** предотвращает попадание новых временных файлов, но не удаляет уже добавленные — для этого используйте команды выше.
- Если ошибка повторяется, внимательно проверьте, нет ли других больших файлов или неотслеживаемых папок, которые могли случайно попасть в индекс.

---

## Если что-то не получается

- Пришлите текст ошибки и команду, которую вы выполняли — тогда будет проще найти решение!
- Если не работает команда `git filter-branch` или push, попробуйте установить [git-filter-repo](https://github.com/newren/git-filter-repo) (это более современный инструмент для очистки истории).
- Для нестандартных ситуаций и сложных ошибок — обратитесь за помощью к вашему наставнику или техническому специалисту.
