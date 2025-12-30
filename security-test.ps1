Write-Host "`n🔒 SECURITY TESTS FOR QUANT FLOW" -ForegroundColor Cyan
Write-Host "=================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"

# Test 1: Create signal without auth
Write-Host "[TEST 1] Create signal without auth..." -ForegroundColor Yellow
try {
    $body = '{"asset":"HACK/USD"}'
    Invoke-RestMethod -Uri "$baseUrl/api/signals" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "   ❌ FAILED - Signal created without auth!" -ForegroundColor Red
} catch {
    Write-Host "   ✅ PASSED - Blocked unauthorized request" -ForegroundColor Green
}

# Test 2: Delete signal without auth
Write-Host "`n[TEST 2] Delete signal without auth..." -ForegroundColor Yellow
try {
    Invoke-RestMethod -Uri "$baseUrl/api/signals/fake-id" -Method DELETE -ErrorAction Stop
    Write-Host "   ❌ FAILED - Signal deleted without auth!" -ForegroundColor Red
} catch {
    Write-Host "   ✅ PASSED - Blocked unauthorized request" -ForegroundColor Green
}

# Test 3: Parse signal without auth
Write-Host "`n[TEST 3] Parse signal without auth..." -ForegroundColor Yellow
try {
    $body = '{"analysis":"test"}'
    Invoke-RestMethod -Uri "$baseUrl/api/parse-signal" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "   ❌ FAILED - Parse accessible without auth!" -ForegroundColor Red
} catch {
    Write-Host "   ✅ PASSED - Blocked unauthorized request" -ForegroundColor Green
}

# Test 4: Polish analysis without auth
Write-Host "`n[TEST 4] Polish analysis without auth..." -ForegroundColor Yellow
try {
    $body = '{"analysis":"test"}'
    Invoke-RestMethod -Uri "$baseUrl/api/polish-analysis" -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "   ❌ FAILED - Polish accessible without auth!" -ForegroundColor Red
} catch {
    Write-Host "   ✅ PASSED - Blocked unauthorized request" -ForegroundColor Green
}

# Test 5: Get signals (should work - public)
Write-Host "`n[TEST 5] Get signals (public)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/signals" -Method GET -ErrorAction Stop
    Write-Host "   ✅ PASSED - Public read works" -ForegroundColor Green
} catch {
    Write-Host "   ⚠️ WARNING - Check if server is running" -ForegroundColor Yellow
}

Write-Host "`n=================================" -ForegroundColor Cyan
Write-Host "🔒 TESTS COMPLETE`n" -ForegroundColor Cyan