param(
    [int]$Port = 8080
)

$Folder = $PSScriptRoot
if (-not $Folder) { $Folder = Get-Location }

$Listener = New-Object System.Net.HttpListener
$Prefix = "http://localhost:$Port/"
$Listener.Prefixes.Add($Prefix)

try {
    $Listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  Servidor Quiet Luxury activo en: $Prefix" -ForegroundColor Green
    Write-Host "  Sirviendo archivos desde: $Folder" -ForegroundColor Gray
    Write-Host "  Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Cyan

    Start-Process $Prefix

    while ($Listener.IsListening) {
        $Context = $Listener.GetContext()
        $Request = $Context.Request
        $Response = $Context.Response

        $LocalPath = $Request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($LocalPath)) {
            $LocalPath = "index.html"
        }

        $FilePath = Join-Path $Folder $LocalPath

        if (Test-Path $FilePath -PathType Leaf) {
            $Extension = [System.IO.Path]::GetExtension($FilePath).ToLower()
            $ContentType = switch ($Extension) {
                ".html" { "text/html; charset=utf-8" }
                ".htm"  { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "application/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".svg"  { "image/svg+xml" }
                ".ico"  { "image/x-icon" }
                Default { "application/octet-stream" }
            }

            $Response.ContentType = $ContentType
            $Bytes = [System.IO.File]::ReadAllBytes($FilePath)
            $Response.ContentLength64 = $Bytes.Length
            $Response.OutputStream.Write($Bytes, 0, $Bytes.Length)
            $Response.StatusCode = 200
        } else {
            $Response.StatusCode = 404
            $NotFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado")
            $Response.ContentType = "text/plain; charset=utf-8"
            $Response.ContentLength64 = $NotFoundMsg.Length
            $Response.OutputStream.Write($NotFoundMsg, 0, $NotFoundMsg.Length)
        }

        $Response.OutputStream.Close()
    }
} catch {
    Write-Error $_.Exception.Message
} finally {
    if ($Listener -and $Listener.IsListening) {
        $Listener.Stop()
    }
}
