import {
  baseOptions,
  linkItems,
  postsPerPage,
  title,
} from "@/app/layout.config";
import { owner } from "@/app/layout.config";
import { cn } from "@/lib/utils";
import { getLinks } from "fumadocs-ui/layouts/shared";
import { InlineLink } from "@/components/inline-link";
import { ActiveLink } from "../active-link";
import { CTA } from "@/app/(home)/_components/call-to-action";
import { getSortedByDatePosts, getTags } from "@/lib/source";

export function Footer() {
  const links = getLinks(linkItems, baseOptions.githubUrl);
  const navItems = links.filter((item) =>
    ["nav", "all"].includes(item.on ?? "all")
  );

  const posts = getSortedByDatePosts();
  const tags = getTags();

  return (
    <footer className={cn("flex flex-col gap-4")}>
      <div
        className={cn(
          "grid gap-8 text-muted-foreground text-sm sm:grid-cols-4",
          "container mx-auto sm:gap-16 sm:px-8 sm:py-16"
        )}
      >
        <div className="flex flex-col gap-6">
          <p className="font-medium text-foreground">Pages</p>

          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <ActiveLink href={"/"}>Home</ActiveLink>
            </li>
            {navItems
              .filter(
                (item) =>
                  item.type !== "menu" &&
                  item.type !== "custom" &&
                  item.type !== "icon"
              )
              .map((item, i) => (
                <li key={item.url}>
                  <ActiveLink key={i.toString()} href={item.url}>
                    {item.text}
                  </ActiveLink>
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-medium text-foreground">Posts</p>

          <ul className="flex flex-col gap-3">
            {posts.slice(0, postsPerPage).map((post, i) => (
              <li key={post.url}>
                <ActiveLink key={i.toString()} href={post.url}>
                  {post.data.title}
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-medium text-foreground">Tags</p>

          <ul className="flex flex-col gap-3">
            {tags.slice(0, postsPerPage).map((name, i) => (
              <li key={`/tags/${name}`}>
                <ActiveLink key={i.toString()} href={`/tags/${name}`}>
                  <span className="capitalize">{name}</span>
                </ActiveLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <p className="font-medium text-foreground">Socials</p>

          <ul className="flex flex-col gap-3">
            {navItems
              .filter((item) => item.type === "icon")
              .map((item, i) => (
                <li key={item.url}>
                  <InlineLink
                    key={i.toString()}
                    href={item.url}
                    className="[&_svg]:size-4 text-muted-foreground no-underline inline-flex items-center gap-1.5"
                  >
                    {item.icon}
                    {item.text}
                  </InlineLink>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Design />
    </footer>
  );
}

function Design() {
  return (
    <div className="footer">
      <span className="footer-text font-mono">john•doe</span>
      <div className="footer-grid" />
      <div className="footer-gradient" />
    </div>
  );
}
