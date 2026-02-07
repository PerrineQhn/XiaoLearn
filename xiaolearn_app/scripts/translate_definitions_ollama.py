#!/usr/bin/env python3
"""
Script pour traduire et améliorer les définitions françaises dans les fichiers HSK.
Utilise Ollama avec des modèles locaux plus ou moins légers - GRATUIT, SANS LIMITES et FACILE !

Modèles recommandés :
- qwen2.5:3b (3GB) - Excellent pour le chinois et multilingue
- qwen2.5:1.5b (1GB) - Plus léger
- llama3.2:3b (2GB) - Bon équilibre
- mistral:7b (4GB) - Meilleure qualité mais plus gros

python scripts/translate_definitions_ollama.py --force --model qwen2.5:7b --generate-examples
"""

import json
import os
import sys
from pathlib import Path
import time
from typing import Dict, List, Optional
import argparse
import subprocess

# Essayer d'importer ollama
try:
    import ollama
except ImportError:
    print("Le module ollama n'est pas installé.")
    print("Installation : pip install ollama")
    print(" Et installer Ollama : https://ollama.com/download")
    sys.exit(1)


class HSKTranslatorOllama:
    """Traducteur pour les définitions HSK utilisant Ollama."""

    def __init__(self, model: str = 'qwen3:4b'):
        """
        Initialise le traducteur Ollama.

        Args:
            model: Nom du modèle Ollama
                - 'qwen2.5:3b': Recommandé pour chinois (3GB)
                - 'qwen2.5:7b': Alternative haute capacité (7GB)
                - 'qwen3:4b': Alternative (3GB)
        """
        self.model = model
        self.stats = {
            'total': 0,
            'translated': 0,
            'improved': 0,
            'skipped': 0,
            'errors': 0
        }

        # Vérifier qu'Ollama est installé
        try:
            subprocess.run(['ollama', '--version'], capture_output=True, check=True)
        except (subprocess.CalledProcessError, FileNotFoundError):
            print("Ollama n'est pas installé sur ce système.")
            print(" Installez Ollama : https://ollama.com/download")
            sys.exit(1)

        # Vérifier que le modèle est disponible (le télécharger si nécessaire)
        print(f"\nVérification du modèle {model}...")
        try:
            models_list = ollama.list()
            model_names = [m.model for m in models_list.models if hasattr(m, 'model')]

            if model not in model_names and f"{model}:latest" not in model_names:
                print(f"Téléchargement du modèle {model}...")
                print("Première utilisation : cela peut prendre quelques minutes")
                ollama.pull(model)

            print("Modèle prêt !")

        except Exception as e:
            print(f"Erreur lors de la vérification du modèle : {str(e)}")
            print(" Le modèle sera téléchargé automatiquement lors de la première utilisation")

    def translate_definition(self, hanzi: str, pinyin: str,
                            translation_en: str, explanation_en: str,
                            existing_fr: Optional[str] = None,
                            generate_examples: bool = False) -> Dict[str, any]:
        """
        Traduit et améliore une définition en français.

        Args:
            hanzi: Caractère chinois
            pinyin: Prononciation pinyin
            translation_en: Traduction anglaise
            explanation_en: Explication anglaise
            existing_fr: Traduction française existante (si disponible)
            generate_examples: Si True, génère aussi des phrases d'exemple

        Returns:
            Dict avec 'translationFr', 'explanationFr' et optionnellement 'examples'
        """
        # Construction du prompt
        prompt = f"""/no_think Tu es un expert en traduction chinois-français et en pédagogie des langues.

TÂCHE : Traduis et améliore la définition suivante du chinois vers le français pour des apprenants francophones.

INFORMATIONS :
- Caractère chinois : {hanzi}
- Pinyin : {pinyin}
- Traduction anglaise : {translation_en}
- Explication anglaise : {explanation_en}"""

        if existing_fr:
            prompt += f"\n- Traduction française existante : {existing_fr}"

        prompt += """

INSTRUCTIONS :
1. Fournis une traduction française CLAIRE et NATURELLE, adaptée aux apprenants
2. Fournis une explication française PÉDAGOGIQUE qui aide à comprendre les nuances et l'usage
3. IMPORTANT : Utilise UNIQUEMENT des mots français qui existent réellement dans le dictionnaire
   - N'INVENTE JAMAIS de mots (ex: "incautieux" n'existe pas, utilise "imprudent" ou "par inadvertance")
   - Vérifie que chaque mot utilisé est du français correct et idiomatique"""

        if generate_examples:
            prompt += """
4. Fournis 2-3 PHRASES D'EXEMPLE simples en chinois avec leur traduction française
5. Les exemples doivent être adaptés au niveau HSK et utiliser un vocabulaire simple"""
        else:
            prompt += """
4. Reste concis et précis"""

        prompt += """
6. Si c'est un verbe, commence par l'infinitif
7. Si nécessaire, inclus les spécificateurs (CL: pour classificateurs, etc.)

FORMAT DE RÉPONSE (strictement) :
TRADUCTION: [ta traduction en français]
EXPLICATION: [ton explication en français]"""

        if generate_examples:
            prompt += """
EXEMPLE1_ZH: [phrase chinoise courte et simple utilisant le mot]
EXEMPLE1_PY: [pinyin avec tons]
EXEMPLE1_FR: [traduction française naturelle]
EXEMPLE2_ZH: [phrase chinoise courte et simple utilisant le mot]
EXEMPLE2_PY: [pinyin avec tons]
EXEMPLE2_FR: [traduction française naturelle]"""

        prompt += """

N'ajoute RIEN d'autre que ce format. Pas de commentaires supplémentaires."""

        try:
            # Appel à Ollama
            response = ollama.generate(
                model=self.model,
                prompt=prompt,
                options={
                    'temperature': 0.3,  # Peu de créativité pour traductions précises
                    'top_p': 0.9,
                    'num_predict': 1000 if generate_examples else 500,  # Plus de tokens pour les exemples
                }
            )

            result_text = response['response'].strip()

            # Parse la réponse
            lines = result_text.split('\n')
            translation_fr = None
            explanation_fr = None
            examples = []
            example_data = {}

            for line in lines:
                line = line.strip()
                if line.startswith('TRADUCTION:'):
                    translation_fr = line.replace('TRADUCTION:', '').strip()
                elif line.startswith('EXPLICATION:'):
                    explanation_fr = line.replace('EXPLICATION:', '').strip()
                elif generate_examples:
                    if line.startswith('EXEMPLE1_ZH:'):
                        example_data['1_zh'] = line.replace('EXEMPLE1_ZH:', '').strip()
                    elif line.startswith('EXEMPLE1_PY:'):
                        example_data['1_py'] = line.replace('EXEMPLE1_PY:', '').strip()
                    elif line.startswith('EXEMPLE1_FR:'):
                        if '1_zh' in example_data:
                            examples.append({
                                'chinese': example_data['1_zh'],
                                'pinyin': example_data.get('1_py', ''),
                                'translation': line.replace('EXEMPLE1_FR:', '').strip()
                            })
                    elif line.startswith('EXEMPLE2_ZH:'):
                        example_data['2_zh'] = line.replace('EXEMPLE2_ZH:', '').strip()
                    elif line.startswith('EXEMPLE2_PY:'):
                        example_data['2_py'] = line.replace('EXEMPLE2_PY:', '').strip()
                    elif line.startswith('EXEMPLE2_FR:'):
                        if '2_zh' in example_data:
                            examples.append({
                                'chinese': example_data['2_zh'],
                                'pinyin': example_data.get('2_py', ''),
                                'translation': line.replace('EXEMPLE2_FR:', '').strip()
                            })
                    elif line.startswith('EXEMPLE3_ZH:'):
                        example_data['3_zh'] = line.replace('EXEMPLE3_ZH:', '').strip()
                    elif line.startswith('EXEMPLE3_PY:'):
                        example_data['3_py'] = line.replace('EXEMPLE3_PY:', '').strip()
                    elif line.startswith('EXEMPLE3_FR:'):
                        if '3_zh' in example_data:
                            examples.append({
                                'chinese': example_data['3_zh'],
                                'pinyin': example_data.get('3_py', ''),
                                'translation': line.replace('EXEMPLE3_FR:', '').strip()
                            })

            # Validation
            if not translation_fr or not explanation_fr:
                print(f"Réponse invalide pour {hanzi} : {result_text[:100]}...")
                # Essayer de parser de manière plus souple
                if 'TRADUCTION' in result_text.upper():
                    parts = result_text.split('EXPLICATION')
                    if len(parts) >= 2:
                        translation_fr = parts[0].replace('TRADUCTION:', '').replace('TRADUCTION', '').strip()
                        explanation_fr = parts[1].replace(':', '').strip()

                # Si toujours pas de résultat, utiliser les valeurs par défaut
                if not translation_fr:
                    translation_fr = existing_fr or translation_en
                if not explanation_fr:
                    explanation_fr = explanation_en

            result = {
                'translationFr': translation_fr,
                'explanationFr': explanation_fr
            }

            if generate_examples and examples:
                result['examples'] = examples

            return result

        except Exception as e:
            print(f"Erreur lors de la traduction de {hanzi}: {str(e)}")
            self.stats['errors'] += 1
            return {
                'translationFr': existing_fr or translation_en,
                'explanationFr': explanation_en
            }

    def should_translate(self, entry: Dict) -> bool:
        """
        Détermine si une entrée doit être traduite.

        Args:
            entry: Entrée HSK

        Returns:
            True si la traduction est nécessaire
        """
        # Si pas d'explanationFr, traduire
        if not entry.get('explanationFr'):
            return True

        # Si l'explanationFr est identique à explanation (anglais), traduire
        if entry.get('explanationFr') == entry.get('explanation'):
            return True

        # Vérifier si translationFr semble être de mauvaise qualité
        translation_fr = entry.get('translationFr', '')
        if not translation_fr or translation_fr == entry.get('translation'):
            return True

        return False

    def process_hsk_file(self, file_path: Path, output_path: Optional[Path] = None,
                         force: bool = False, limit: Optional[int] = None,
                         auto_save_interval: int = 10, generate_examples: bool = False) -> None:
        """
        Traite un fichier HSK.

        Args:
            file_path: Chemin du fichier HSK
            output_path: Chemin de sortie (par défaut, écrase le fichier d'origine)
            force: Force la retraduction même si explanationFr existe
            limit: Limite le nombre d'entrées à traiter (pour tester)
            auto_save_interval: Sauvegarde automatique tous les X éléments traduits
            generate_examples: Si True, génère aussi des phrases d'exemple
        """
        print(f"\nTraitement de {file_path.name}...")

        # Lire le fichier JSON
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        total_entries = len(data)
        if limit:
            data = data[:limit]
            print(f"Mode test : limitation à {limit} entrées")

        self.stats['total'] = len(data)
        output_file = output_path or file_path
        translated_count = 0

        # Traiter chaque entrée
        try:
            for i, entry in enumerate(data, 1):
                hanzi = entry.get('hanzi', '?')

                # Vérifier si la traduction est nécessaire
                needs_translation = force or self.should_translate(entry)

                if not needs_translation:
                    self.stats['skipped'] += 1
                    if i % 10 == 0:
                        print(f"  {i}/{len(data)} - {hanzi} (déjà traduit)")
                    continue

                print(f"  {i}/{len(data)} - Traduction de {hanzi} ({entry.get('pinyin', '')})...")

                # Traduire
                result = self.translate_definition(
                    hanzi=hanzi,
                    pinyin=entry.get('pinyin', ''),
                    translation_en=entry.get('translation', ''),
                    explanation_en=entry.get('explanation', ''),
                    existing_fr=entry.get('translationFr'),
                    generate_examples=generate_examples
                )

                # Mettre à jour l'entrée
                old_translation = entry.get('translationFr')
                old_explanation = entry.get('explanationFr')

                entry['translationFr'] = result['translationFr']
                entry['explanationFr'] = result['explanationFr']

                # Ajouter les exemples si générés
                if 'examples' in result:
                    entry['examples'] = result['examples']
                    print(f"    Exemples : {len(result['examples'])} phrases générées")

                if old_translation != result['translationFr']:
                    self.stats['improved'] += 1
                    print(f"    Traduction : {result['translationFr'][:80]}...")

                if old_explanation != result['explanationFr']:
                    self.stats['translated'] += 1
                    print(f"    Explication : {result['explanationFr'][:80]}...")

                translated_count += 1

                # Sauvegarde automatique tous les X éléments
                if auto_save_interval > 0 and translated_count % auto_save_interval == 0:
                    print(f"\n  Sauvegarde intermédiaire ({translated_count} traductions)...")
                    with open(output_file, 'w', encoding='utf-8') as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)

        except KeyboardInterrupt:
            print("\n\nInterruption par l'utilisateur. Sauvegarde des progrès...")
        except Exception as e:
            print(f"\nErreur : {str(e)}")
            print("Sauvegarde des progrès...")

        # Sauvegarder finale
        print(f"\nSauvegarde finale dans {output_file.name}...")

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        print(f"Fichier sauvegardé : {output_file}")

    def print_stats(self):
        """Affiche les statistiques de traduction."""
        print("\n" + "="*60)
        print("STATISTIQUES DE TRADUCTION")
        print("="*60)
        print(f"  Total d'entrées     : {self.stats['total']}")
        print(f"  Traductions créées  : {self.stats['translated']}")
        print(f"  Traductions améliorées : {self.stats['improved']}")
        print(f"  Ignorées            : {self.stats['skipped']}")
        print(f"  Erreurs             : {self.stats['errors']}")
        print("="*60)


def main():
    """Fonction principale."""
    parser = argparse.ArgumentParser(
        description='Traduit et améliore les définitions françaises dans les fichiers HSK avec Ollama'
    )
    parser.add_argument(
        'files',
        nargs='*',
        help='Fichiers HSK à traiter (ex: data/hsk1.json). Si vide, traite tous les fichiers HSK.'
    )
    parser.add_argument(
        '--force',
        action='store_true',
        help='Force la retraduction même si explanationFr existe'
    )
    parser.add_argument(
        '--limit',
        type=int,
        help='Limite le nombre d\'entrées à traiter (pour tester)'
    )
    parser.add_argument(
        '--model',
        default='qwen2.5:3b',
        help='Modèle Ollama à utiliser (défaut: qwen2.5:3b, recommandé pour chinois)'
    )
    parser.add_argument(
        '--generate-examples',
        action='store_true',
        help='Génère aussi 2-3 phrases d\'exemple pour chaque mot (prend plus de temps)'
    )

    args = parser.parse_args()

    # Déterminer les fichiers à traiter
    if args.files:
        files = [Path(f) for f in args.files]
    else:
        # Trouver tous les fichiers HSK dans data/
        data_dir = Path(__file__).parent.parent / 'data'
        files = list(data_dir.glob('hsk*.json'))

    if not files:
        print("Aucun fichier HSK trouvé.")
        sys.exit(1)

    print("="*60)
    print("🚀 TRADUCTEUR DE DÉFINITIONS HSK (OLLAMA)")
    print("="*60)
    print(f"Modèle : {args.model}")
    print(f"Fichiers à traiter : {len(files)}")
    for f in files:
        print(f"   - {f.name}")
    print(f" Force : {args.force}")
    if args.limit:
        print(f" Limite : {args.limit} entrées")
    if args.generate_examples:
        print(f" Génération d'exemples : OUI (2-3 phrases par mot)")
    print("="*60)
    print("\nAVANTAGES OLLAMA :")
    print("   Gratuit et illimité")
    print("   Fonctionne hors ligne")
    print("   Pas de quota API")
    print("   Modèles optimisés pour le chinois (qwen2.5)")
    print("="*60)

    # Confirmation
    if not args.limit:
        confirm = input("\nCette opération peut prendre du temps. Continuer ? (o/N) : ")
        if confirm.lower() not in ['o', 'oui', 'y', 'yes']:
            print("Opération annulée.")
            sys.exit(0)

    # Créer le traducteur
    translator = HSKTranslatorOllama(model=args.model)

    # Traiter chaque fichier
    for file_path in files:
        try:
            translator.process_hsk_file(
                file_path=file_path,
                force=args.force,
                limit=args.limit,
                generate_examples=args.generate_examples
            )
        except Exception as e:
            print(f"Erreur lors du traitement de {file_path}: {str(e)}")

    # Afficher les statistiques
    translator.print_stats()

    print("\nTraduction terminée !")


if __name__ == '__main__':
    main()
