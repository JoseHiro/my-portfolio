import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { KonamiProvider } from "@/components/providers/KonamiProvider";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleProvider>
        <ThemeProvider>
          <KonamiProvider>
            <CommandPalette />
            <ScrollProgress />
            <FloatingActionButton />
            <CustomCursor />
            <Header />
            {children}
          </KonamiProvider>
        </ThemeProvider>
      </LocaleProvider>
    </NextIntlClientProvider>
  );
}
