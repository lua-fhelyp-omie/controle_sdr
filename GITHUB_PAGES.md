# 🚀 Como Hospedar no GitHub Pages (GRÁTIS)

## ✅ **O que você precisa:**
- Conta no GitHub (grátis)
- Os arquivos: `index.html`, `app.js`, `create_audit_logs_table.sql`

---

## 📋 **Passo a Passo Completo:**

### **1. Criar Conta no GitHub (se não tiver)**
1. Acesse: https://github.com
2. Clique em "Sign up"
3. Preencha email, senha e username
4. Verifique seu email

---

### **2. Criar Novo Repositório**

1. No GitHub, clique no ícone `+` no canto superior direito
2. Selecione **"New repository"**

3. Preencha:
   - **Repository name:** `sistema-sdr` (ou qualquer nome sem espaços)
   - **Description:** Sistema de Controle de Distribuição SDR - Omie
   - ✅ Marque **"Public"**
   - ✅ Marque **"Add a README file"**
   
4. Clique em **"Create repository"**

---

### **3. Fazer Upload dos Arquivos**

**Opção A: Via Interface Web (Mais Fácil)**

1. No repositório criado, clique em **"Add file"** → **"Upload files"**

2. Arraste ou selecione os arquivos:
   - `index.html`
   - `app.js`
   
3. Na caixa "Commit changes" escreva: `Adicionar sistema SDR`

4. Clique em **"Commit changes"**

**Opção B: Via Git (Se souber usar)**

```bash
git clone https://github.com/seu-usuario/sistema-sdr.git
cd sistema-sdr
# Copie os arquivos index.html e app.js para esta pasta
git add .
git commit -m "Adicionar sistema SDR"
git push
```

---

### **4. Ativar GitHub Pages**

1. No seu repositório, clique em **"Settings"** (⚙️ Configurações)

2. No menu lateral esquerdo, clique em **"Pages"**

3. Em **"Source"** (Branch):
   - Selecione **"main"** (ou "master")
   - Selecione **"/ (root)"**
   
4. Clique em **"Save"**

5. Aguarde 2-3 minutos

6. **Pronto!** Seu site estará disponível em:
   ```
   https://seu-usuario.github.io/sistema-sdr/
   ```

---

### **5. Acessar o Sistema**

1. Acesse: `https://seu-usuario.github.io/sistema-sdr/`

2. Faça login com credenciais da tabela `users` do Supabase

3. ✅ Sistema funcionando!

---

## 🔧 **Configurações Importantes:**

### **Antes de publicar, crie a tabela de auditoria:**

1. Acesse o Supabase: https://xmqjwqtfatxfwyuxovcg.supabase.co

2. Vá em **SQL Editor**

3. Execute o conteúdo de `create_audit_logs_table.sql`

4. Verifique se a tabela `audit_logs` foi criada

---

## 🎯 **Pronto para Uso!**

Seu sistema agora está:
- ✅ **Online 24/7**
- ✅ **HTTPS automático** (seguro)
- ✅ **Grátis para sempre**
- ✅ **URL personalizada**

---

## 📝 **Atualizando o Sistema:**

Para fazer mudanças:

1. Edite os arquivos localmente
2. Volte ao GitHub → **"Add file"** → **"Upload files"**
3. Faça upload dos arquivos atualizados
4. Marque **"Overwrite"** se perguntar
5. Commit changes
6. Aguarde 1-2 minutos para atualizar

---

## 🔒 **Segurança:**

**⚠️ IMPORTANTE:**
- As credenciais do Supabase estão no código
- Para uso em produção, considere implementar:
  - Variáveis de ambiente
  - Autenticação via Supabase Auth
  - Row Level Security (RLS)
  - Hash de senhas

**Para desenvolvimento/uso interno, está OK!**

---

## 🌐 **URL Personalizada (Opcional)**

Se você tiver um domínio próprio:

1. Vá em **Settings** → **Pages**
2. Em **"Custom domain"** adicione seu domínio
3. Configure DNS (veja docs do GitHub)

Exemplo: `sdr.suaempresa.com.br`

---

## ❓ **Problemas Comuns:**

### **"404 - File not found"**
- Verifique se o arquivo se chama exatamente `index.html` (minúsculas)
- Aguarde 5 minutos após fazer upload

### **"Página em branco"**
- Abra o Console (F12) e veja os erros
- Verifique se `app.js` está na mesma pasta que `index.html`

### **"Erro no login"**
- Verifique se executou o script SQL `create_audit_logs_table.sql`
- Confirme que o usuário existe na tabela `users`

### **"GitHub Pages não aparece em Settings"**
- Certifique-se que o repositório é **Public**
- Se for **Private**, precisa de conta paga

---

## 🎉 **Vantagens do GitHub Pages:**

✅ Hospedagem grátis  
✅ HTTPS incluído  
✅ CDN global (rápido em todo o mundo)  
✅ 99.9% de uptime  
✅ Sem limite de visitantes  
✅ Fácil de atualizar  
✅ Suporta domínio personalizado  

---

## 📱 **Acessando de Qualquer Lugar:**

Depois de publicado, você pode acessar de:
- ✅ Qualquer computador
- ✅ Celular
- ✅ Tablet
- ✅ Qualquer navegador

Basta acessar: `https://seu-usuario.github.io/sistema-sdr/`

---

## 🔄 **Próximos Passos (Opcional):**

1. **Personalizar URL:**
   - Comprar domínio (ex: `sdr.omie.com.br`)
   - Configurar no GitHub Pages

2. **Adicionar Analytics:**
   - Google Analytics
   - Hotjar para ver como usuários usam

3. **Melhorias de Performance:**
   - Minificar código
   - Comprimir assets

4. **CI/CD:**
   - GitHub Actions
   - Deploy automático

---

## 📊 **Estatísticas do Seu Site:**

No GitHub você pode ver:
- Número de visitantes
- Tráfego
- Páginas mais visitadas

Em: **Insights** → **Traffic**

---

## 💰 **Custos:**

**ZERO!** 🎉

GitHub Pages é 100% gratuito para:
- Sites estáticos (HTML/CSS/JS)
- Repositórios públicos
- Banda ilimitada
- Storage de 1GB (mais que suficiente)

---

## 🆘 **Precisa de Ajuda?**

1. **Documentação GitHub Pages:**
   https://pages.github.com

2. **Documentação GitHub:**
   https://docs.github.com

3. **Comunidade GitHub:**
   https://github.community

4. **Tutorial em vídeo:**
   Procure "GitHub Pages tutorial" no YouTube

---

## ✅ **Checklist Final:**

- [ ] Conta no GitHub criada
- [ ] Repositório criado (public)
- [ ] Arquivos `index.html` e `app.js` enviados
- [ ] GitHub Pages ativado
- [ ] Tabela `audit_logs` criada no Supabase
- [ ] Testei o login
- [ ] Sistema funcionando!

---

## 🎯 **Resumo Ultra-Rápido:**

```
1. GitHub.com → Criar conta
2. New Repository → "sistema-sdr" (public)
3. Upload: index.html + app.js
4. Settings → Pages → Source: main
5. Acesse: seu-usuario.github.io/sistema-sdr
```

**Tempo total: 10 minutos**

---

**Desenvolvido para Omie - Equipe Inbound 💜**

*Dúvidas? Todos os arquivos têm documentação completa!*
