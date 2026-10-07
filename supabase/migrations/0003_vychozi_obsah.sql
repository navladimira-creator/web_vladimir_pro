-- Výchozí obsah modulů podle texty/obsah-modulu.md.
-- Názvy videí a souborů jsou pracovní, správné názvy doplní majitel v administraci.
-- Videa zatím nemají Bunny ID, materiály zatím nemají nahraný soubor.

-- Popisy modulů (krátké, podle texty/jednotlive-moduly.md)
update modules set title = 'Ochutnávka',
  description = 'Ochutnávka z celého kurzu + úvodní data.'
  where slug = 'ochutnavka-zdarma';
update modules set description = 'Odrazový můstek a základní stavební kámen pro všechny gastro podniky.'
  where slug = 'produkt';
update modules set description = 'Po 1. modulu máš na čem stavět, teď je potřeba next level.'
  where slug = 'provoz';
update modules set description = 'Nový výchozí bod pro tebe. Pochopení zákazníka a výběr personálu nikdy nepřehlížej.'
  where slug = 'lide';
update modules set description = 'Poslední krok k výjimečnosti. Získej „NEFÉR“ výhodu.'
  where slug = 'identita-a-brand';
update modules set title = 'Bonusový modul',
  description = 'Jak si udržet zdravého ducha a neposrat se z toho.',
  long_description = 'Celý byznys obvykle stojí na pár lidech. Buď je to majitel, nebo manažer, nebo ředitel nebo šéf a jeho nejlepší zaměstnanec. Je to hodně křehké a je potřeba držet se v dobré mentální pozici. K tomu také vede pár základních kroků. Není to o tom, že musíš meditovat na úpatí hory každý den, objímat stromy nebo si vytloukat mozek z hlavy kamenama. Každý máme nějaký ten způsob úniku od reality. V tomto modulu ti ukážu, jak této realitě čelit a neposrat se z toho!'
  where slug = 'bonus';

-- Videa: 1. je vždy úvodní, ostatní doprovodná
insert into lessons (module_id, title, sort_order)
select m.id,
       case when g = 1 then 'Úvodní video' else 'Doprovodné video ' || (g - 1) end,
       g
from modules m
join (values
  ('ochutnavka-zdarma', 1),
  ('produkt', 9),
  ('provoz', 8),
  ('lide', 8),
  ('identita-a-brand', 7),
  ('bonus', 3)
) as v(slug, pocet) on v.slug = m.slug
cross join lateral generate_series(1, v.pocet) as g;

-- Materiály
insert into materials (module_id, type, title, sort_order)
select m.id, v.typ::material_type, v.nazev, v.poradi
from modules m
join (values
  ('ochutnavka-zdarma', 'checklist', 'Checklist', 1),
  ('ochutnavka-zdarma', 'manual', 'Manuál', 2),

  ('produkt', 'skripta', 'Skripta – Modul 1 Produkt', 1),
  ('produkt', 'checklist', 'Checklist na tvorbu nového menu', 2),
  ('produkt', 'checklist', 'Checklist k přecenění menu', 3),
  ('produkt', 'tabulka', 'Tabulka menu engineering', 4),
  ('produkt', 'tabulka', 'Tabulka na počítání food costu', 5),
  ('produkt', 'dokument', 'Dokument na tvorbu chytrého menu', 6),

  ('provoz', 'skripta', 'Skripta – Modul 2 Provoz', 1),
  ('provoz', 'manual', 'Krizový manuál', 2),
  ('provoz', 'checklist', 'Otevírací a zavírací checklist', 3),
  ('provoz', 'tabulka', 'Tabulka na výpočet hodnoty hodiny provozu', 4),
  ('provoz', 'tabulka', 'Tabulka evidence plýtvání', 5),
  ('provoz', 'tabulka', 'Tabulka na výpočet KPI', 6),
  ('provoz', 'tabulka', 'Tabulka na plánování směn', 7),
  ('provoz', 'ukoly_test', 'Úkoly k modulu 2', 8),
  ('provoz', 'dokument', 'Mapa baru', 9),

  ('lide', 'skripta', 'Skripta – Modul 3 Lidé', 1),
  ('lide', 'manual', 'Manuál na zaškolení zaměstnance na upsell a cross-sell', 2),
  ('lide', 'manual', 'Manuál komunikace personálu', 3),
  ('lide', 'checklist', 'Checklist na nábor zaměstnance', 4),
  ('lide', 'checklist', 'Checklist na výběr áčkového hráče', 5),
  ('lide', 'checklist', 'Checklist na zaškolení zaměstnance', 6),
  ('lide', 'checklist', 'Checklist onboardingu', 7),
  ('lide', 'ukoly_test', 'Test pro baristy', 8),
  ('lide', 'ukoly_test', 'Test s hotovými odpověďmi', 9),
  ('lide', 'ukoly_test', 'Úkoly k modulu 3', 10),

  ('identita-a-brand', 'skripta', 'Skripta – Modul 4 Identita a brand', 1),
  ('identita-a-brand', 'manual', 'Mini brand manuál', 2),
  ('identita-a-brand', 'manual', 'Manuál na zvládání negativních recenzí', 3),
  ('identita-a-brand', 'checklist', 'Checklist na focení', 4),
  ('identita-a-brand', 'checklist', 'Checklist na offline marketing', 5),
  ('identita-a-brand', 'tabulka', 'Plánovač sezonního menu', 6),
  ('identita-a-brand', 'ukoly_test', 'Úkoly k modulu 4', 7),
  ('identita-a-brand', 'dokument', 'Souhlas s GDPR – vzor', 8),

  ('bonus', 'skripta', 'Skripta – Modul 5', 1),
  ('bonus', 'manual', 'Manuál finanční rezerva', 2),
  ('bonus', 'checklist', 'Checklist na legislativu', 3),
  ('bonus', 'tabulka', 'Tabulka na měsíční hospodaření', 4),
  ('bonus', 'tabulka', 'Tabulka na roční rozpočet (nástroj)', 5)
) as v(slug, typ, nazev, poradi) on v.slug = m.slug;
