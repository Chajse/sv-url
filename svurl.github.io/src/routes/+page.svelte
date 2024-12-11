<script lang="ts">
  import EncryptionService from "$lib/services/data_security";
  import { onMount } from "svelte";
  import { api } from "$lib/services/data_fetch";
  import QRCode from "qrcode";
  import type { Url } from "$lib/stores/url_stores";
  import { urls } from "$lib/stores/url_stores";

  let originalUrl = "";
  let shortUrl = "";
  let customKeyword = "";
  let qrCodeData = "";
  let displayURLS: Url[] = [];
  let qrCodeColor = "#000000";
  let qrCodeBackground = "#ffffff";

  onMount(async () => {
    try {
      await urls.fetchUrls();
      urls.subscribe((data: Url[]) => {
        displayURLS = data;
      });
    } catch (error) {
      console.log(error);
    }
  });

  const shortenUrl = async () => {
    try {
      if (!originalUrl) {
        alert("Please enter a URL");
        return;
      }

      if (customKeyword && !/^[a-zA-Z0-9-_]+$/.test(customKeyword)) {
        alert(
          "Custom keyword can only contain letters, numbers, hyphens, and underscores"
        );
        return;
      }

      const dataToEncrypt = {
        url: originalUrl,
        custom_keyword: customKeyword || null,
      };
      const encryptedData = EncryptionService.encrypt(dataToEncrypt);

      // Send the encrypted data
      const data = await api.post("route.php?request=shorten", {
        encrypted: encryptedData,
      });

      if (data.status.remarks === "success" && data.payload?.short_url) {
        shortUrl = data.payload.short_url;
        generateQRCode(shortUrl);
      } else {
        console.error("Backend response error:", data.status.message);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  const generateQRCode = async (url: string) => {
    try {
      qrCodeData = await QRCode.toDataURL(url, {
        color: {
          dark: qrCodeColor,
          light: qrCodeBackground,
        },
        width: 300,
      });
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrCodeData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
</script>

<div class="min-h-screen flex flex-col items-center bg-gray-900 text-white">
  <!-- Header -->
  <header class="w-full bg-gray-800 text-center py-4">
    <h1 class="text-4xl">
      <span class="text-sred">SV</span><span class="text-white font-bold"
        >URL</span
      >
    </h1>
  </header>

  <!-- Main Content -->
  <main class="flex flex-col items-center mt-12 px-6 w-full">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
      <h2 class="text-2xl font-semibold mb-4 text-center">Shorten URL</h2>
      <input
        type="text"
        bind:value={originalUrl}
        placeholder="Enter a URL"
        class="w-full p-3 mb-4 text-gray-900 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
      />
      <input
        type="text"
        bind:value={customKeyword}
        placeholder="Custom keyword (optional)"
        class="w-full p-3 mb-4 text-gray-900 border rounded-lg focus:outline-none focus:ring focus:ring-red-500"
      />
      <p class="text-xs text-gray-400 mb-4">
        Custom keyword can contain letters, numbers, hyphens, and underscores
      </p>
      <div class="button-container">
        <button
          on:click={shortenUrl}
          class="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition border justify-center w-full"
        >
          Shorten
        </button>
      </div>

      {#if shortUrl}
        <div class="mt-6">
          <p>
            <strong>Shortened URL:</strong>
            <a
              href={shortUrl}
              target="_blank"
              class="text-red-400 underline hover:text-red-300">{shortUrl}</a
            >
          </p>
          <div class="mt-4 text-center">
            <h3 class="text-lg font-medium">QR Code:</h3>
            <img
              src={qrCodeData}
              alt="QR Code"
              class="mt-4 inline-block rounded-lg shadow-md"
            />
          </div>
          <div class="flex gap-4 justify-center items-center mt-2">
            <div class="flex items-center">
              <label for="qrColor" class="mr-2 text-xs">QR Color:</label>
              <input
                type="color"
                id="qrColor"
                bind:value={qrCodeColor}
                on:change={() => generateQRCode(shortUrl)}
                class="w-12 h-8"
              />
            </div>
            <div class="flex items-center">
              <label for="bgColor" class="mr-2 text-xs">Background:</label>
              <input
                type="color"
                id="bgColor"
                bind:value={qrCodeBackground}
                on:change={() => generateQRCode(shortUrl)}
                class="w-12 h-8"
              />
            </div>
            <button
              on:click={downloadQRCode}
              class=" text-white bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded-lg transition"
            >
              Download
            </button>
          </div>
        </div>
      {/if}
    </div>
    <div class="max-h-60 overflow-y-auto mt-5">
      <ul role="list" class="divide-y divide-gray-100">
        {#each $urls as url}
          <li
            class="flex justify-between gap-x-6 py-5 border-b border-gray-700"
          >
            <div class="flex min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <a
                  href={`http://localhost/yourls/${url.keyword}`}
                  class="text-sm font-semibold text-white"
                  target="_blank"
                >
                  http://localhost/yourls/{url.keyword}
                </a>
                <p class="mt-1 truncate text-xs text-gray-400">
                  {url.url}
                </p>
              </div>
            </div>
            <div class="shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="mt-1 text-xs text-gray-400">
                Created: {new Date(url.timestamp).toLocaleString()}
              </p>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </main>

  <!-- Footer -->
  <footer class="w-full bg-gray-800 text-center py-4 mt-auto">
    <p class="text-sm text-gray-400">&copy; 2024 SVURL. All rights reserved.</p>
  </footer>
</div>
