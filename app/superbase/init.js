import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SUPABASE_KEY, SUPA_BASEURL} from '../utils/constants';

const supabaseUrl = SUPA_BASEURL;
const supabaseKey = SUPABASE_KEY;
export const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage,
  detectSessionInUrl: false,
});
