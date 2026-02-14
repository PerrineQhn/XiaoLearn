import type { HSKEntry } from '../types/hsk';
import hsk1Data from './hsk1.json';
import hsk2Data from './hsk2.json';
import hsk3Data from './hsk3.json';
import hsk4Data from './hsk4.json';
import hsk5Data from './hsk5.json';
import hsk6Data from './hsk6.json';
import hsk7Data from './hsk7.json';

export const ALL_HSK_ENTRIES: HSKEntry[] = [
  ...(hsk1Data as HSKEntry[]),
  ...(hsk2Data as HSKEntry[]),
  ...(hsk3Data as HSKEntry[]),
  ...(hsk4Data as HSKEntry[]),
  ...(hsk5Data as HSKEntry[]),
  ...(hsk6Data as HSKEntry[]),
  ...(hsk7Data as HSKEntry[]),
];
