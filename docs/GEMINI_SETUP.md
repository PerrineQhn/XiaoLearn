# Configuration de l'Assistant IA avec Google Gemini

XiaoLearn utilise **Google Gemini 1.5 Flash** pour alimenter l'assistant IA qui aide les utilisateurs à apprendre le chinois.

## Caractéristiques

- **100% Gratuit** : Pas de carte bancaire requise
- **Limite généreuse** : 15 requêtes/minute, 1500 requêtes/jour
- **Intelligent** : Comprend le contexte, supporte le markdown, répond en français et anglais
- **Fallback** : Si l'API échoue ou n'est pas configurée, utilise des réponses pré-programmées

## Comment obtenir une clé API Gemini

### 1. Accéder à Google AI Studio

Visitez [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

### 2. Créer une clé API

1. Connectez-vous avec votre compte Google
2. Cliquez sur **"Create API Key"**
3. Sélectionnez un projet Google Cloud (ou créez-en un nouveau)
4. Copiez la clé générée

### 3. Configurer la clé localement

Ajoutez la clé dans votre fichier `.env.local` :

```bash
VITE_GEMINI_API_KEY=votre-clé-api-ici
```

### 4. Configurer pour la production

Pour déployer sur GitHub Pages avec GitHub Actions :

1. Allez dans **Settings** > **Secrets and variables** > **Actions**
2. Cliquez **"New repository secret"**
3. Nom : `VITE_GEMINI_API_KEY`
4. Valeur : Votre clé API Gemini
5. Cliquez **"Add secret"**

Ensuite, ajoutez également la clé dans `.env.production` pour les builds locaux.

## Vérification

### Test en développement

```bash
npm run dev
```

Accédez à l'Assistant IA et posez une question. Si tout fonctionne :
- Vous verrez une réponse générée par Gemini (intelligent, contextuel)
- En cas d'erreur, vous verrez les réponses fallback pré-programmées

### Vérifier les logs

Ouvrez la console du navigateur (F12) :
- ✅ Pas d'erreur API = Gemini fonctionne
- ⚠️ "Gemini API key not configured" = Clé manquante, utilise le fallback
- ❌ Erreur 401/403 = Clé invalide
- ❌ Erreur 429 = Limite de taux dépassée

## Architecture

```
┌─────────────────────────────────────┐
│    AIAssistantPage.tsx              │
│  (Interface utilisateur)            │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│    services/geminiService.ts        │
│  • Appelle l'API Gemini             │
│  • Gère le contexte conversation    │
│  • Fallback en cas d'erreur         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Google Gemini 1.5 Flash API        │
│  https://generativelanguage...      │
└─────────────────────────────────────┘
```

## Fonctionnalités de l'assistant

### Contexte de conversation

L'assistant se souvient de toute la conversation pour des réponses contextuelles :

```typescript
// Exemple : L'historique est passé à chaque requête
const response = await generateGeminiResponse(question, conversationHistory);
```

### Markdown automatique

Les réponses supportent le markdown :
- **Gras** avec `**texte**`
- Listes avec `-` ou `1.`
- Code avec `` `code` ``
- Blocs de code avec ` ```code``` `
- Titres avec `#`, `##`, `###`

### Prompt système

Le système est configuré pour être un expert en chinois :

```
Tu es un assistant IA spécialisé dans l'enseignement du chinois mandarin.
Tu aides les apprenants francophones et anglophones à comprendre:
- La grammaire chinoise
- Le vocabulaire et les caractères (汉字)
- La prononciation et les tons
[...]
```

## Mode fallback

Si Gemini n'est pas disponible, l'assistant utilise des réponses pré-programmées pour :
- Les tons chinois
- Les particules 了 et 过
- Former des questions
- Structure de phrase
- Classificateurs
- Exprimer "aimer"

## Limites et considérations

### Quotas gratuits

- **15 requêtes/minute** : Suffisant pour usage normal
- **1500 requêtes/jour** : ~45 000/mois
- Pour 1000 utilisateurs actifs : ~45 questions par utilisateur/mois

### Gestion des erreurs

Le service gère automatiquement :
- ✅ Clé API manquante → Fallback
- ✅ Erreur réseau → Fallback
- ✅ Limite dépassée → Message d'erreur approprié
- ✅ Réponse invalide → Fallback

### Sécurité

- ⚠️ Ne JAMAIS commiter la clé API
- ✅ Clé stockée dans `.env.local` (gitignored)
- ✅ Utiliser GitHub Secrets pour CI/CD
- ✅ Filtres de sécurité Gemini activés

## Alternatives futures

Si les quotas gratuits deviennent insuffisants :

1. **Groq** (Llama 3) : Plus rapide, 14 400 req/jour gratuit
2. **HuggingFace** : Modèles open source
3. **Gemini Pro** : Payant mais plus puissant
4. **Self-hosted** : Llama 2/3 en local

## Dépannage

### L'assistant ne répond pas

1. Vérifiez la console (F12) pour les erreurs
2. Vérifiez que `VITE_GEMINI_API_KEY` est défini
3. Testez la clé sur [AI Studio](https://makersuite.google.com/)

### Réponses génériques

Si vous voyez toujours les réponses pré-programmées :
- La clé API n'est peut-être pas valide
- Vérifiez les logs de la console
- Le fallback fonctionne correctement

### Erreur 429 (Rate limit)

Vous avez dépassé le quota :
- Attendez quelques minutes (limite par minute)
- Attendez le lendemain (limite journalière)
- Considérez une alternative ou upgrade

## Support

Pour toute question sur l'intégration Gemini :
- Documentation officielle : [https://ai.google.dev/docs](https://ai.google.dev/docs)
- Code source : `src/services/geminiService.ts`
- Interface : `src/pages/AIAssistantPage.tsx`
