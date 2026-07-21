/**
 * auth-proxy — proxyfie app.xiaolearn.com/__/auth/* vers le handler
 * d'authentification Firebase (xiaolearn-db9e6.firebaseapp.com).
 *
 * Pourquoi : Firebase Auth héberge son handler OAuth sur
 * <projet>.firebaseapp.com. Google affiche ce domaine sur l'écran de
 * consentement (« pour continuer vers xiaolearn-db9e6.firebaseapp.com »).
 * En servant le handler depuis app.xiaolearn.com (ce proxy) et en mettant
 * authDomain=app.xiaolearn.com dans la config Firebase, Google affiche
 * notre vrai domaine.
 *
 * Doc officielle : https://firebase.google.com/docs/auth/web/redirect-best-practices
 * (option 3 : « Proxy auth requests to firebaseapp.com »)
 */
const FIREBASE_AUTH_HOST = 'xiaolearn-db9e6.firebaseapp.com';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Sécurité : ne proxyfie QUE le chemin du handler d'auth.
    if (!url.pathname.startsWith('/__/auth/') && !url.pathname.startsWith('/__/firebase/')) {
      return new Response('Not found', { status: 404 });
    }

    url.hostname = FIREBASE_AUTH_HOST;
    url.port = '';
    url.protocol = 'https:';

    // Reconstruit la requête vers Firebase en préservant méthode, headers
    // et body. Le header Host est réécrit automatiquement par fetch().
    const proxied = new Request(url.toString(), request);
    return fetch(proxied);
  }
};
