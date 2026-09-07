import { test } from 'node:test';
import assert from 'node:assert/strict';
import {calculateQuote} from '../lib/pricing.ts';
test('all meter and contract combinations use the requested monthly discounts',()=>{for(const [meter,base] of Object.entries({mini:75,touch:85,mirror:95})){for(const [period,discount] of [[6,0],[12,10],[24,20]]){const q=calculateQuote({meter,period,mpos:false,dispatch:'none',extra:false});assert.equal(q.monthly,base-discount);assert.equal(q.total,(base-discount)*period+150)}}});
test('accessories add once and totals retain cent precision',()=>{const q=calculateQuote({meter:'touch',period:24,mpos:true,dispatch:'tablet',extra:true});assert.equal(q.monthly,168.2);assert.equal(q.total,4186.8);assert.equal(q.dispatchPrice,61)});
test('unsupported contract and accessories fail intentionally',()=>{for(const invalid of [{period:48},{dispatch:'both'},{meter:'unknown'},{mpos:'yes'}])assert.throws(()=>calculateQuote({meter:'mini',period:6,mpos:false,dispatch:'none',extra:false,...invalid}))});
